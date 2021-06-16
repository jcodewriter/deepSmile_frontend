import React from "react";
import PixProfileModalLayout from "src/modules/pix/pages/Profile/ProfileModals/components/Layout/PixProfileModalLayout";
import useTranslation from "next-translate/useTranslation";
import PixProfileModalInformationForm from "../../Forms/PixProfileModalInformationForm";

const PixProfileModalModifyInfoView = ({
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
      title={t("profile:profileModalModifyInfoTitle")}
    >
      <PixProfileModalInformationForm
        buttonText={t("profile:profileModalModifyInfoButton")}
        closeModal={closeModal}
      />
    </PixProfileModalLayout>
  );
};

export default PixProfileModalModifyInfoView;
