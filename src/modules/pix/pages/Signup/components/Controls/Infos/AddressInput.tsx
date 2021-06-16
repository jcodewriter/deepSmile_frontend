import React, { Dispatch, SetStateAction } from "react";
import { FormControl, FormLabel } from "@chakra-ui/core";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import useTranslation from "next-translate/useTranslation";

export interface GooglePlaceValue {
  label: string;
  value: {
    place_id: string;
  };
}
/*
const getAddressFromProfile = (userInfos: UserInfos | undefined) => {
  if (userInfos === undefined) {
    return "";
  }
  const output = `${userInfos.address}, ${userInfos.zipcode ?? ""} ${userInfos.city ?? ""}, ${
    userInfos.country ?? ""
  }`;

  return output;
};
*/
const AddressInput = ({
  value,
  onChange,
}: {
  value?: GooglePlaceValue;
  onChange: Dispatch<SetStateAction<GooglePlaceValue | undefined>>;
}) => {
  const { t } = useTranslation();

  return (
    <FormControl>
      <FormLabel fontWeight="bold" fontSize="16px" lineHeight="20px">
        {t("pixSignup:addressLabel")}
      </FormLabel>
      <GooglePlacesAutocomplete
        apiKey={process.env.GOOGLE_PLACES_API_KEY}
        selectProps={{
          value,
          onChange,
          // inputId: "address",
          // name: "address",
        }}
      />
    </FormControl>
  );
};

export default AddressInput;
