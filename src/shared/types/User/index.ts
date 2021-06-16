// User type as described in GraphQL schema
export interface User {
  id?: number;
  email?: string;
  infos?: UserInfos;
  billingInfos?: UserInfos;
  statePlan?: SubscriptionPlanStateEnum;
  logo?: string;
  country?: string;
  city?: string;
  eu?: string;
  timezone?: string;
  signUpEmailSent?: boolean;
  useMirror?: boolean;
  useMirrorOcclusal?: boolean;
  customizationParameters?: UserCustomizationParameters;
  admin?: boolean;
  createdAt?: string;
  updatedAt?: string;
  planInfos?: PlanInfos;
}

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

export enum SubscriptionPlanStateEnum {
  NONE = "NONE",
  ONBOARDING = "ONBOARDING",
  TRIAL = "TRIAL",
  PAYMENT_PENDING = "PAYMENT_PENDING",
  ACTIVE = "ACTIVE",
  ACTIVE_WILL_EXPIRE = "ACTIVE_WILL_EXPIRE",
  ACTIVE_WILL_DOWNGRADE = "ACTIVE_WILL_DOWNGRADE",
}

export interface UserInfos {
  id?: number;
  firstName?: string;
  lastName?: string;
  gender?: Gender;
  softwareName?: string;
  hearAboutUs?: string;
  newsletter?: boolean;
  address?: string;
  zipcode?: string;
  city?: string;
  country?: string;
  phone?: string;
  company?: string;
}

export interface PlanInfos {
  invoices?: Invoice[];
  plan?: SubscriptionPlanEnum;
  plan2?: SubscriptionPlanProductEnum;
  numberOfPhotosUsed?: number;
  numberOfPhotosInPlan?: number;
  nextBilling?: string;
  card?: Card;
}

export interface Plan {
  plan: SubscriptionPlanProductEnum;
  price: number;
  numberOfPhotosInPlan: number;
}

export interface Invoice {
  date?: string;
  url?: string;
  amount?: number;
  currency?: string;
  paid?: boolean;
}

export enum SubscriptionPlanEnum {
  FREE = "FREE",
  SOLO_MONTHLY = "SOLO_MONTHLY",
  CABINET_MONTHLY = "CABINET_MONTHLY",
}

export enum SubscriptionPlanProductEnum {
  FREE = "FREE",
  BASIC = "BASIC",
  UNLIMITED = "UNLIMITED",
  NONE = "NONE",
}

export interface Card {
  brand?: string;
  exp_month?: number;
  exp_year?: number;
  last4?: string;
  country?: string;
  name?: string;
}

export interface UserInfosCreateInput {
  firstName: string;
  lastName: string;
  gender: Gender;
  softwareName: string;
  hearAboutUs: string;
  newsletter: boolean;
  address: string;
  zipcode: string;
  city: string;
  country: string;
  phone: string;
  company: string;
}

export interface UserBillingInfosCreateInput {
  address: string;
  zipcode: string;
  city: string;
  country: string;
}

export interface UserCustomizationParameters {
  id: string;
  useMirror: boolean;
  autoSoftwareFlip: boolean;
  useMirrorOcclusal: boolean;
  faceZoomLevel: FaceZoomLevel;
  faceBackgroundColor: string;
  occlusalCut: OcclusalCut;
  intraOralZoomLevel: IntraOralZoomLevel;
}

export enum FaceZoomLevel {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
}

export enum OcclusalCut {
  SIX = "SIX",
  SEVEN = "SEVEN",
}

export enum IntraOralZoomLevel {
  LEVEL_85P = "LEVEL_85P",
  LEVEL_95P = "LEVEL_95P",
}
