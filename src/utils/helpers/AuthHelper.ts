import Cookies from "js-cookie";
import CommonHelper from "src/utils/helpers/CommonHelper";
import { Context } from "@apollo/client";

type UpdateAccessAndRefreshTokensParams = {
  ctx: Context;
  accessToken: string;
  refreshToken: string;
};

const AUTH_TOKEN_FIELD = "auth";

const getCookieFromContext = (name: string, ctx: Context = {}) => {
  if (CommonHelper.isBrowser()) {
    return Cookies.get(name);
  }

  if (ctx.req) {
    const cookie = require("cookie");
    return cookie.parse(ctx.req.headers.cookie || "")[name];
  }

  return null;
};

const updateCookie = (name: string, value: string, ctx: Context = {}) => {
  if (CommonHelper.isBrowser()) {
    Cookies.set(name, value);
  } else {
    if (ctx.res && !CommonHelper.isResSent(ctx.res)) {
      const cookie = require("cookie");
      ctx.res.setHeader("Set-Cookie", cookie.serialize(name, value));
    } else {
      console.warn('Cannot update cookie, because "req" is undefined or request headers are sent');
    }
  }
};

const removeCookie = (name: string, ctx: Context = {}) => {
  if (CommonHelper.isBrowser()) {
    Cookies.remove(name);
  } else {
    if (ctx.res && !CommonHelper.isResSent(ctx.res)) {
      const cookie = require("cookie");
      ctx.res.setHeader("Set-Cookie", cookie.serialize(name, "", { expires: new Date() }));
    } else {
      console.warn('Cannot clear cookie, because "req" is undefined or request headers are sent');
    }
  }
};

const getTokenMap = (ctx: Context = {}) => {
  const cookie = getCookieFromContext(AUTH_TOKEN_FIELD, ctx);
  let parsedCookie = null;

  try {
    parsedCookie = JSON.parse(cookie);
  } catch (error) {
    removeCookie(AUTH_TOKEN_FIELD, ctx);
  }
  return parsedCookie || {};
};

export default class AuthHelper {
  static getCookieField(field: string, ctx: Context = {}): string {
    const tokenMap = getTokenMap(ctx);
    return tokenMap[field];
  }

  static getAccessToken(ctx: Context = {}): string {
    const tokenMap = getTokenMap(ctx);
    return tokenMap.accessToken;
  }

  static getRefreshToken(ctx: Context = {}): string {
    const tokenMap = getTokenMap(ctx);
    return tokenMap.refreshToken;
  }

  static updateCookieField(name: string, value: string, ctx: Context = {}): void {
    const tokenMap = getTokenMap(ctx);
    const newCookie = { ...tokenMap, [name]: value };
    updateCookie(AUTH_TOKEN_FIELD, JSON.stringify(newCookie), ctx);
  }

  static updateAccessToken(token: string, ctx: Context = {}): void {
    const tokenMap = getTokenMap(ctx);
    const newCookie = { ...tokenMap, accessToken: token };
    updateCookie(AUTH_TOKEN_FIELD, JSON.stringify(newCookie), ctx);
  }

  static updateRefreshToken(token: string, ctx: Context = {}): void {
    const tokenMap = getTokenMap(ctx);
    const newCookie = { ...tokenMap, refreshToken: token };
    updateCookie(AUTH_TOKEN_FIELD, JSON.stringify(newCookie), ctx);
  }

  static updateAccessAndRefreshTokens({
    ctx,
    accessToken,
    refreshToken,
  }: UpdateAccessAndRefreshTokensParams): void {
    const newCookie = JSON.stringify({ accessToken, refreshToken });
    updateCookie(AUTH_TOKEN_FIELD, newCookie, ctx);
  }

  static removeCookieField(field: string, ctx: Context): void {
    this.updateCookieField(field, "", ctx);
  }

  static removeAccessToken(ctx: Context): void {
    this.updateAccessToken("", ctx);
  }

  static removeRefreshToken(ctx: Context): void {
    this.updateRefreshToken("", ctx);
  }

  static removeAccessAndRefreshTokens(ctx: Context): void {
    removeCookie(AUTH_TOKEN_FIELD, ctx);
  }

  /*
  TODO: Update when new plans are defined
  static hasAuthPermission(planState): boolean {
    return [
      SUBSCRIPTION_PLAN_STATES.ACTIVE,
      SUBSCRIPTION_PLAN_STATES.ACTIVE_WILL_DOWNGRADE,
      SUBSCRIPTION_PLAN_STATES.ACTIVE_WILL_EXPIRE,
      SUBSCRIPTION_PLAN_STATES.PAYMENT_PENDING,
      SUBSCRIPTION_PLAN_STATES.TRIAL,
      Boolean(process.env.BETA_REGISTER_ENABLED) ? SUBSCRIPTION_PLAN_STATES.ONBOARDING : null,
    ]
      .filter(Boolean)
      .includes(planState);
  }
  */
}
