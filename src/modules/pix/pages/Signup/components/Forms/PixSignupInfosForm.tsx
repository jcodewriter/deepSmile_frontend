/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, Dispatch, SetStateAction } from "react";
import { Stack, Center } from "@chakra-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import { Gender, User, UserInfosCreateInput } from "types/User";
import { useAuth } from "src/shared/contexts/AuthContext";
import { geocodeByPlaceId } from "react-google-places-autocomplete";
import useTranslation from "next-translate/useTranslation";
import GenderInput from "../Controls/Infos/GenderInput";
import NameInput from "../Controls/Infos/NameInput";
import SoftwareInput from "../Controls/Infos/SoftwareInput";
import AddressInput, { GooglePlaceValue } from "../Controls/Infos/AddressInput";
import { SharedGradientButton } from "src/shared/components/Button/SharedGradientButton";
import { PixSignUpSteps } from "../..";
import SourceInput from "../Controls/Infos/SourceInput";
import PhoneInput from "../Controls/Infos/PhoneInput";
import * as GTagHelper from "src/utils/helpers/GTagHelper";
import { track } from "src/services/Segment/analytics";
import { useSentry } from "src/services/Sentry";

interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  gender: Gender;
  software: string;
  otherSoftware: string;
  source: string;
  otherSource: string;
}

const convertToPayload = ({
  software,
  otherSoftware,
  source,
  otherSource,
  ...other
}: FormData): Partial<UserInfosCreateInput> => {
  return {
    ...other,
    softwareName: software === "otherSoftware" ? otherSoftware : software,
    hearAboutUs: source === "otherSource" ? otherSource : source,
  };
};

/**
 * Both array are used to render the radio and to fill them
 * if the user goes back to infos
 */
const softwareData: { name: "software"; value: string; text: string }[] = [
  { name: "software", value: "Ortholeader", text: "softwareFirstOption" },
  { name: "software", value: "Orthokis", text: "softwareSecondOption" },
  { name: "software", value: "Orhalis/Kitview", text: "softwareThirdOption" },
  { name: "software", value: "otherSoftware", text: "sourceElseOption" },
];

const sourceData = [
  { name: "source", value: "Social networks", text: "sourceSocialOption" },
  { name: "source", value: "Google search", text: "sourceGoogleOption" },
  { name: "source", value: "Press", text: "sourcePressOption" },
  { name: "source", value: "Word of mouth", text: "sourceMouthOption" },
  { name: "source", value: "otherSource", text: "sourceElseOption" },
];

/**
 * Fill the values if the user goes back.
 * if are needed to handle the "autre" field
 */
const handleDefaultValues = (profile: User | undefined) => {
  const defaultValues: Partial<FormData> = {};

  if (profile !== undefined) {
    defaultValues.firstName = profile.infos?.firstName;
    defaultValues.lastName = profile.infos?.lastName;
    defaultValues.phone = profile.infos?.phone;
    defaultValues.gender = profile.infos?.gender;

    if (
      profile.infos?.softwareName !== undefined &&
      softwareData.map((elem) => elem.value).includes(profile.infos?.softwareName)
    ) {
      defaultValues.software = profile.infos?.softwareName;
    } else {
      defaultValues.software = "otherSoftware";
      defaultValues.otherSoftware = profile.infos?.softwareName;
    }
    if (
      profile.infos?.hearAboutUs !== undefined &&
      sourceData.map((elem) => elem.value).includes(profile.infos?.hearAboutUs)
    ) {
      defaultValues.source = profile.infos?.hearAboutUs;
    } else {
      defaultValues.source = "otherSource";
      defaultValues.otherSource = profile.infos?.hearAboutUs;
    }
  }
  return defaultValues;
};

const getAddressType = (addressComponents: { [x: string]: any }, name: string) => {
  return addressComponents.find((component: { [x: string]: any }) => component.types.includes(name))
    ? addressComponents.filter((component: { [x: string]: any }) =>
        component.types.includes(name)
      )[0].long_name
    : "";
};

const PixSignupInfosForm = ({ setStep }: { setStep: Dispatch<SetStateAction<PixSignUpSteps>> }) => {
  const { t } = useTranslation();
  const [{ profile }, { updateUserInfos }] = useAuth();
  const formMethods = useForm<FormData>({
    mode: "onBlur",
    defaultValues: handleDefaultValues(profile),
  });
  const { handleSubmit, formState, setError } = formMethods;
  const [googlePlaceValue, setGooglePlaceValue] = useState<GooglePlaceValue | undefined>(undefined);
  const { log } = useSentry();

  const onSubmit = handleSubmit(async (values) => {
    if (!values.gender) {
      setError("gender", { type: "required", message: t("form:formRequiredField") });
      return;
    }

    let payload: Partial<UserInfosCreateInput> = {};

    // If user input a new place, query the address fields.
    if (googlePlaceValue) {
      const res = await geocodeByPlaceId(googlePlaceValue?.value?.place_id);
      const addressComponents = res[0].address_components;
      console.log("addressComponents:", addressComponents);

      payload.address = `${getAddressType(addressComponents, "street_number")} ${getAddressType(
        addressComponents,
        "route"
      )}`;

      payload.zipcode = getAddressType(addressComponents, "postal_code");
      payload.city = getAddressType(addressComponents, "locality");
      payload.country = getAddressType(addressComponents, "country");
    }

    // merge place values and form values
    payload = { ...payload, ...convertToPayload(values) };
    updateUserInfos(payload);

    try {
      GTagHelper.event({
        action: "FRONT | New SignUp | STEP 2 | Got User Infos",
        category: "SIGNUP",
        payload: { email: profile?.email },
      });
      if (typeof window.analytics !== "undefined")
        track("FRONT | New SignUp | STEP 2 | Got User Infos", {
          email: profile?.email,
        });
    } catch (e) {
      log(e, "error");
    }
    setStep(PixSignUpSteps.PLANS_STEP);
  });

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={onSubmit}>
        <Stack spacing="40px" mb="55px">
          <GenderInput />
          <NameInput />
          <PhoneInput />
          <AddressInput value={googlePlaceValue} onChange={setGooglePlaceValue} />
          <SoftwareInput data={softwareData} />
          <SourceInput data={sourceData} />
          <Center>
            <SharedGradientButton
              type="submit"
              isLoading={formState.isSubmitting}
              variant="white"
              w="400px"
            >
              {t("pixSignup:goButton")}
            </SharedGradientButton>
          </Center>
        </Stack>
      </form>
    </FormProvider>
  );
};

export default PixSignupInfosForm;
