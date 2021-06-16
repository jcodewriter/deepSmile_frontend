import useTranslation from "next-translate/useTranslation";
import React from "react";
import PixSharedInput from "src/modules/pix/shared/components/Forms/PixSharedInput";

const PhoneInput = () => {
  const { t } = useTranslation();

  return (
    <PixSharedInput name="phone" placeholder="01 02 03 04 05" label={t("pixSignup:phoneLabel")} />
  );
};

export default PhoneInput;
