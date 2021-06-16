import React from "react";
import useTranslation from "next-translate/useTranslation";
import PixProfileModalLayout from "src/modules/pix/pages/Profile/ProfileModals/components/Layout/PixProfileModalLayout";
import PixProfileModalAddressModifyForm from "../../Forms/PixProfileModalAddressModifyForm";

const PixProfileModalModifyAddressView = ({
  closeModal,
  width,
  height,
}: {
  closeModal: () => void;
  width: string;
  height: string;
}) => {
  const { t } = useTranslation();

  return (
    <PixProfileModalLayout
      width={width}
      height={height}
      title={t("profile:profileModalModifyAddressTitle")}
    >
      <PixProfileModalAddressModifyForm
        buttonText={t("profile:profileModalModifyAddressButton")}
        closeModal={closeModal}
      />
    </PixProfileModalLayout>
  );
};

export default PixProfileModalModifyAddressView;
