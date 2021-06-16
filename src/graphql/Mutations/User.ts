import gql from "graphql-tag";
import { USER_FRAGMENT } from "src/graphql/fragments";

export const UPDATE_USER_INFOS = gql`
  mutation updateUserInfos(
    $activateTrial: Boolean
    $infos: UserInfosCreateInput
    $billingInfos: UserInfosCreateInput
    $logoImage: Upload
    $useMirror: Boolean
    $useMirrorOcclusal: Boolean
    $customizationParameters: CustomizationParametersCreateInput
  ) {
    updateUserInfos(
      activateTrial: $activateTrial
      infos: $infos
      billingInfos: $billingInfos
      logoImage: $logoImage
      useMirror: $useMirror
      useMirrorOcclusal: $useMirrorOcclusal
      customizationParameters: $customizationParameters
    ) ${USER_FRAGMENT}
  }
`;

export const UPDATE_PASSWORD = gql`
  mutation updatePassword($newPassword: String!, $resetToken: String) {
    updatePassword(newPassword: $newPassword, resetToken: $resetToken)
  }
`;

export const CHANGE_CREDIT_CARD = gql`
  mutation changeCreditCard($cardToken: String!) {
    changeCreditCard(cardToken: $cardToken)
  }
`;
