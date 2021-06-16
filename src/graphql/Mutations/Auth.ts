import gql from "graphql-tag";
import { USER_FRAGMENT } from "../fragments";

export const REFRESH_TOKENS = gql`
  mutation refreshTokens($refreshToken: String) {
    refreshTokens(refreshToken: $refreshToken) {
      authToken
      refreshToken
      user {
        email
        infos {
          firstName
          lastName
        }
        planInfos {
          numberOfPhotosInPlan
          numberOfPhotosUsed
          nextBilling
        }
      }
    }
  }
`;

export const SIGN_IN = gql`
  mutation login($email: String, $password: String) {
    login(email: $email, password: $password) {
      authToken
      refreshToken
      user {
        id
        email
        infos {
          firstName
          lastName
        }
      }
    }
  }
`;

export const SIGN_UP = gql`
  mutation signUpOrLogin($email: String, $password: String, $infos: UserInfosCreateInput) {
    signUpOrLogin(email: $email, password: $password, infos: $infos) {
      authToken
      refreshToken
      user ${USER_FRAGMENT}
    }
  }
`;
