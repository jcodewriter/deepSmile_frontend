import gql from "graphql-tag";
import { USER_FRAGMENT } from "src/graphql/fragments";

export const GET_PROFILE = gql`
  query {
    me ${USER_FRAGMENT}
  }
`;

export const NUMBER_OF_PHOTOS = gql`
  query {
    me {
      planInfos {
        numberOfPhotosUsed
        numberOfPhotosInPlan
        nextBilling
      }
    }
  }
`;

export const RESET_PASSWORD = gql`
  query resetPassword($email: String!) {
    resetPassword2(email: $email)
  }
`;
