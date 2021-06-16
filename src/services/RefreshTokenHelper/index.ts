/*
 * The sole purpose of this module is to make refactoring easier
 * if we want to switch to httpOnly cookies.
 */

import { getSecondsUntilExpired, setToken, removeToken } from "src/services/AuthTokenHelper";

const refreshTokenName = "udini_refresh_token";

export const getRefreshToken = () => {
  if (process.browser) {
    return localStorage.getItem(refreshTokenName);
  }
  return null;
};

export const setRefreshToken = (newToken: string) => {
  localStorage.setItem(refreshTokenName, newToken);
};

export const removeRefreshToken = () => {
  localStorage.removeItem(refreshTokenName);
};

export const setTokensAndTimeout = (
  refreshToken: string,
  authToken: string,
  callBack: () => void
) => {
  setRefreshToken(refreshToken);
  setToken(authToken);

  // Refresh the token 30 seconds before it expires
  const timer = (getSecondsUntilExpired() - 30) * 1000;
  setTimeout(() => {
    callBack();
  }, timer);
};

export const disconnectUser = () => {
  removeToken();
  removeRefreshToken();
};
