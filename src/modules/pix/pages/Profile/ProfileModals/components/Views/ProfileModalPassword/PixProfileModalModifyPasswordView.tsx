import React from "react";
import PixProfileModalLayout from "src/modules/pix/pages/Profile/ProfileModals/components/Layout/PixProfileModalLayout";
import useTranslation from "next-translate/useTranslation";
import PixProfileModalPasswordForm from "../../Forms/PixProfileModalPasswordForm";

const PixProfileModalModifyPasswordView = ({
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
      title={t("profile:profileModalModifyPasswordTitle")}
    >
      <PixProfileModalPasswordForm
        buttonText={t("profile:profileModalModifyPasswordButton")}
        closeModal={closeModal}
      />
    </PixProfileModalLayout>
  );
};

export default PixProfileModalModifyPasswordView;
