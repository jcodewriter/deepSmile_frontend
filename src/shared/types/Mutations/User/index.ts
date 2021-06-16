import {
  User,
  UserBillingInfosCreateInput,
  UserCustomizationParameters,
  UserInfosCreateInput,
} from "types/User";

export interface ChangeCreditCardVariables {
  cardToken: string;
}

export interface ChangeCreditCardPayload {
  changeCreditCard: boolean;
}

/**
 * Interfaces for Updating user informations
 */
export interface UpdateUserInfosPayload {
  updateUserInfos: User;
}

export interface UpdateUserInfosVariables {
  activateTrial?: boolean;
  infos?: Partial<UserInfosCreateInput>;
  billingInfos?: Partial<UserBillingInfosCreateInput>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  logoImage?: any; //TODO: Find the type of a file (probably provided by apollo-upload-link)
  useMirror?: boolean;
  useMirrorOcclusal?: boolean;
  customizationParameters?: Partial<UserCustomizationParameters>;
}
