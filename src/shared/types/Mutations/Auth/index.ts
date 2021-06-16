import { User, UserInfosCreateInput } from "types/User";

/**
 * Interfaces for SignIn mutation
 */
export interface SignInPayload {
  login: {
    authToken: string;
    refreshToken: string;
    user: User;
  };
}

export interface SignInVariables {
  email: string;
  password: string;
}

/**
 * Interfaces for RefreshTokens mutation
 */
export interface RefreshTokensPayload {
  refreshTokens: {
    authToken: string;
    refreshToken: string;
    user: User;
  };
}

export interface RefreshTokensVariables {
  refreshToken: string;
}

/**
 * Interfaces for SignUp mutation
 */
export interface SignUpPayload {
  signUpOrLogin: {
    authToken: string;
    refreshToken: string;
    user: User;
  };
}

export interface SignUpVariables {
  email: string;
  password: string;
  infos?: UserInfosCreateInput;
}
