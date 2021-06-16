import React from "react";
import useTranslation from "next-translate/useTranslation";
import PixProfileModalLayout from "src/modules/pix/pages/Profile/ProfileModals/components/Layout/PixProfileModalLayout";
import PixProfileModalAddressAddForm from "../../Forms/PixProfileModalAddressAddForm";

const PixProfileModalAddAddressView = ({
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
      title={t("profile:profileModalAddAddressTitle")}
    >
      <PixProfileModalAddressAddForm
        buttonText={t("profile:profileModalAddAddressButton")}
        closeModal={closeModal}
      />
    </PixProfileModalLayout>
  );
};

export default PixProfileModalAddAddressView;
