import React, { createContext, useState, useCallback, useEffect } from "react";
import { ApolloError, useLazyQuery, useMutation } from "@apollo/client";

import useSafeContext from "../hooks/useSafeContext";
import {
  User,
  UserInfosCreateInput,
  UserBillingInfosCreateInput,
  UserCustomizationParameters,
} from "types/User";
import { REFRESH_TOKENS, SIGN_IN, SIGN_UP } from "src/graphql/Mutations/Auth";
import { UPDATE_USER_INFOS } from "src/graphql/Mutations/User";
import { GET_PROFILE, NUMBER_OF_PHOTOS } from "src/graphql/Queries/User";
import {
  getRefreshToken,
  setTokensAndTimeout,
  disconnectUser,
} from "src/services/RefreshTokenHelper";
import {
  RefreshTokensPayload,
  RefreshTokensVariables,
  SignInPayload,
  SignInVariables,
  SignUpPayload,
  SignUpVariables,
} from "types/Mutations/Auth";
import { UpdateUserInfosPayload, UpdateUserInfosVariables } from "types/Mutations/User";
import { MePayload } from "types/Queries/User";

import { storePrefLang, initialLang } from "src/utils/helpers/LanguageHelper";
import { rerouteIfNeeded, rerouteAtLoginCallback } from "src/utils/constants/routes";
import { useSentry } from "src/services/Sentry";

export enum SIGN_UP_STEP {
  ERROR,
  NEW_ACCOUNT,
  ACCOUNT,
}

export type ProfileProps = {
  children: React.ReactNode;
};

interface StateContextProps {
  prefLang: string;
  profile: User | undefined;
  isAuthenticated: boolean;
  hasRefreshToken: boolean;
  errorMessages: string[];
  hasJustRegistered: boolean; // Used to handle case where user sign up and payment failed
}

interface DispatchContextProps {
  refreshNumberOfPhotos: () => void;
  setPrefLang: (prefLang: string) => void;
  logUser: (email: string, password: string) => void;
  signUp: (email: string, password: string) => Promise<number>;
  getProfile: () => void;
  disconnect: () => void;
  updateUserInfos: (infos: Partial<UserInfosCreateInput>) => void;
  updateUserBillingInfos: (billingInfos: Partial<UserBillingInfosCreateInput>) => void;
  updateUserLogo: (logoImage: File) => void;
  updateUserCustomizationParameters: (
    customizationParameters: Partial<UserCustomizationParameters>
  ) => void;
  setHasJustRegistered: () => void;
}

const AuthStateContext = createContext<StateContextProps | undefined>(undefined);
const AuthDispatchContext = createContext<DispatchContextProps | undefined>(undefined);

export const AuthProvider: React.FC<ProfileProps> = ({ children }) => {
  const [prefLang, setPrefLang] = useState<string>(initialLang());
  const [profile, setProfile] = useState<User | undefined>(undefined);
  const [hasJustRegistered, setHasJustRegistered] = useState(false);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const { log } = useSentry();
  const [getProfileQuery] = useLazyQuery<MePayload>(GET_PROFILE, {
    onCompleted: (res) => {
      setProfile((oldProfile) => ({ ...oldProfile, ...res?.me }));
    },
    fetchPolicy: "network-only",
  });

  const [refreshNumberOfPhotos] = useLazyQuery<MePayload>(NUMBER_OF_PHOTOS, {
    fetchPolicy: "no-cache",
    onCompleted: (res) => {
      console.log(res);
      setProfile((oldProfile) => ({ ...oldProfile, ...res.me }));
    },
  });

  const [refresh] = useMutation<RefreshTokensPayload, RefreshTokensVariables>(REFRESH_TOKENS, {
    onCompleted: (res) => {
      setTokensAndTimeout(res.refreshTokens.refreshToken, res.refreshTokens.authToken, refreshAuth);
      // TODO: Update local profile after each request ?
      if (!profile) {
        setProfile(res.refreshTokens.user);
        getProfileQuery();
      }
    },
  });
  const [login] = useMutation<SignInPayload, SignInVariables>(SIGN_IN, {
    onCompleted: (res) => {
      setErrorMessages([]);
      setTokensAndTimeout(res.login.refreshToken, res.login.authToken, refreshAuth);
      if (window.analytics) {
        window.analytics.identify(res.login.user.id);
      } else {
        log("No analytics found in window during signin", "error");
      }
      getProfileQuery();
      rerouteAtLoginCallback();
      //setProfile((oldProfile) => ({ ...oldProfile, ...res.login.user }));
    },
  });
  const [createUser] = useMutation<SignUpPayload, SignUpVariables>(SIGN_UP, {
    onCompleted: (res) => {
      setErrorMessages([]);
      setTokensAndTimeout(res.signUpOrLogin.refreshToken, res.signUpOrLogin.authToken, refreshAuth);
      if (window.analytics) {
        window.analytics.identify(res.signUpOrLogin.user.id);
      } else {
        log("No analytics found in window during signup", "error");
      }
      setProfile((oldProfile) => ({ ...oldProfile, ...res.signUpOrLogin.user }));
    },
  });
  const [updateUser] = useMutation<UpdateUserInfosPayload, UpdateUserInfosVariables>(
    UPDATE_USER_INFOS,
    {
      onCompleted: (res) => {
        setProfile((oldProfile) => ({ ...oldProfile, ...res.updateUserInfos }));
      },
    }
  );

  const logUser = useCallback(
    (email: string, password: string) => {
      setErrorMessages([]);
      login({ variables: { email, password } }).catch((err: ApolloError) => {
        setErrorMessages((old) => [...old, ...err.graphQLErrors.map((elem) => elem.message)]);
      });
    },
    [login]
  );

  const disconnect = useCallback(() => {
    disconnectUser();
    setProfile(undefined);
  }, []);

  const signUp = useCallback(
    async (email: string, password: string) => {
      setErrorMessages([]);
      try {
        const res = await createUser({ variables: { email, password } });

        if (res.data?.signUpOrLogin.user.planInfos) {
          return SIGN_UP_STEP.ACCOUNT;
        } else {
          return SIGN_UP_STEP.NEW_ACCOUNT;
        }
      } catch (err) {
        const e: ApolloError = err; // workaround of typescript any
        setErrorMessages((old) => [...old, ...e.graphQLErrors.map((elem) => elem.message)]);
        return SIGN_UP_STEP.ERROR;
      }
    },
    [createUser]
  );

  const updateUserInfos = useCallback((infos: Partial<UserInfosCreateInput>) => {
    updateUser({ variables: { infos: infos } });
  }, []);

  const updateUserBillingInfos = useCallback(
    (billingInfos: Partial<UserBillingInfosCreateInput>) => {
      updateUser({ variables: { billingInfos: billingInfos } });
    },
    []
  );

  const updateUserLogo = useCallback((logoImage: File) => {
    updateUser({ variables: { logoImage } });
  }, []);

  const updateUserCustomizationParameters = useCallback(
    (customizationParameters: Partial<UserCustomizationParameters>) => {
      updateUser({ variables: { customizationParameters: customizationParameters } }).catch(
        (err: ApolloError) => {
          setErrorMessages((old) => [...old, ...err.graphQLErrors.map((elem) => elem.message)]);
        }
      );
    },
    []
  );

  const getProfile = useCallback(() => {
    getProfileQuery();
  }, [getProfileQuery]);

  /**
   * Call for a new token if there is a refresh token
   */
  const refreshAuth = useCallback(() => {
    const refreshToken = getRefreshToken();
    if (refreshToken) {
      refresh({ variables: { refreshToken } });
    }
  }, [refresh]);

  /**
   * We check if someone was already connected
   * This will do nothing if there is no refreshToken in localStorage
   * TODO: Fetch user info if user had a refreshToken
   */
  useEffect(() => {
    refreshAuth();
  }, []);

  /**
   * keep stored prefLang synced
   */
  useEffect(() => storePrefLang(prefLang), [prefLang]);

  /**
   * check if we need to redirect the user to show
   * the appropriate language
   */
  useEffect(() => rerouteIfNeeded(prefLang), []);

  return (
    <AuthStateContext.Provider
      value={{
        prefLang: prefLang,
        profile: profile,
        isAuthenticated: !!profile,
        errorMessages: errorMessages,
        hasRefreshToken: !!getRefreshToken(),
        hasJustRegistered,
      }}
    >
      <AuthDispatchContext.Provider
        value={{
          refreshNumberOfPhotos,
          setPrefLang,
          logUser,
          getProfile,
          signUp,
          disconnect,
          updateUserInfos,
          updateUserBillingInfos,
          updateUserCustomizationParameters,
          updateUserLogo,
          setHasJustRegistered: () => setHasJustRegistered(true),
        }}
      >
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};

export const useAuthState = () => {
  return useSafeContext(AuthStateContext, "AuthStateContext");
};

export const useAuthDispatch = () => {
  return useSafeContext(AuthDispatchContext, "AuthDispatchContext");
};

export const useAuth = (): [StateContextProps, DispatchContextProps] => [
  useAuthState(),
  useAuthDispatch(),
];

// Export contexts for testing purposes
export { AuthStateContext, AuthDispatchContext };
