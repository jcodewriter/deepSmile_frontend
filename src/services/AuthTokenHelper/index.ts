let authToken: string;

interface AuthTokenInterface {
  exp: number;
  iat: number;
  idUser: string;
}

const setToken = (newToken: string) => {
  authToken = newToken;
};

const removeToken = () => {
  authToken = "";
};

const getToken = () => authToken;

const parseJwt = (token: string) => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
};

const isTokenExpired = () => {
  const jwt: AuthTokenInterface = parseJwt(authToken);

  return jwt.exp < new Date().getTime() / 1000;
};

const getSecondsUntilExpired = () => {
  const jwt: AuthTokenInterface = parseJwt(authToken);

  return jwt.exp - new Date().getTime() / 1000;
};

export { setToken, getToken, isTokenExpired, getSecondsUntilExpired, removeToken };
