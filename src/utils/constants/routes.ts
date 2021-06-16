import Router from "next/router";
import fixHref from "next-translate/fixHref";
import i18nConfig from "i18n.json";
import { isSupported } from "../helpers/LanguageHelper";

/** UDINI WEBSITE **/
export const UDINI_HOME_ROUTE = "/";
export const UDINI_PRODUCTS_ROUTE = "/products";
export const UDINI_ABOUT_ROUTE = "/about";
export const UDINI_COMMUNITY_ROUTE = "/community";
export const UDINI_PRODUCT_PIX_ROUTE = "/products/pix";
export const UDINI_PRODUCT_SMILE_ROUTE = "/products/smile";
export const UDINI_FORM_HREF_ROUTE = "/form/[mode]/[stage]";
export const UDINI_FORM_AS_ROUTE = "/form/";
export const UDINI_TERMS_AND_CONDITIONS_ROUTE = "/terms-and-conditions";
export const UDINI_TERMS_OF_USE_ROUTE = "/terms-of-use";
export const UDINI_CONTACT_ROUTE = "/contact";
export const UDINI_FAQ_ROUTE = "/faq";
export const PRODUCTS_PIX_PRICING_SECTION = "/products#pix-pricing";

/** PIX WEB APP **/
export const PIX_HOME_ROUTE = "/pix";
export const PIX_SIGNIN_ROUTE = "/pix/signin";
export const PIX_PASSWORD_FORGOTTEN_ROUTE = "/pix/password-forgotten";
export const PIX_SIGNUP_ROUTE = "/pix/signup";
export const PIX_FUNNEL_ROUTE = "/pix/funnel";
export const PIX_PHOTO_IMPORT_ROUTE = "/pix/photo-import";

/** FORMS **/
export const SMILE_FORM = "/form/smile";
export const COMMUNITY_FORM = "/form/community";

export const pushNext = (
  url: string,
  as?: string,
  options?: Record<string, unknown> | undefined
) => {
  const fixedHref = fixHref(url, options?.lang);
  Router.router?.push(fixedHref, as, options);
};

export const rerouteToLang = (lang: string) => {
  const pathname = cleanLangFromPathname(Router.router?.pathname ?? "");
  pushNext(pathname, undefined, { lang });
};

export const rerouteIfNeeded = (lang: string) => {
  if (!isSupported(lang)) {
    // No rerouting needed if the language is not supported
    console.log(`${lang} is not supported yet.`);
    return;
  }

  const pathname = Router.router?.asPath ?? "";

  if (pathname.startsWith("/fr/pix/restore") || pathname.startsWith("/pix/restore")) return;
  if (needsReroute(pathname, lang)) {
    const newPathname = cleanLangFromPathname(pathname);
    pushNext(newPathname, undefined, { lang });
  }
};

export const rerouteAtLoginCallback = () => {
  if (Router.router?.query.callback) {
    window.location.href = Router.router?.query.callback as string;
  }
};

const cleanLangFromPathname = (pathname: string) => {
  i18nConfig.allLanguages.forEach((l) => {
    pathname = pathname.replace(`/${l}/`, "/");
    if (pathname.slice(-(l.length + 1)) === `/${l}`) {
      pathname = pathname.substr(0, pathname.length - l.length);
    }
  });
  return pathname;
};

const needsReroute = (pathname: string, lang: string) => {
  return !(pathname.includes(`/${lang}/`) || pathname.slice(-(lang.length + 1)) === `/${lang}`);
};
