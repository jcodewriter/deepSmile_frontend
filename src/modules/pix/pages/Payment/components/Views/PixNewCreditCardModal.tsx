import React from "react";
import PixProfileModalLayout from "src/modules/pix/pages/Profile/ProfileModals/components/Layout/PixProfileModalLayout";
import useTranslation from "next-translate/useTranslation";
import PixNewreditCardForm from "src/modules/pix/pages/Payment/components/Forms/PixNewCreditCardForm";

const PixNewCreditCardModal = ({
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
    <PixProfileModalLayout width={width} height={height} title={t("pixPayment:paymentModalTitle")}>
      <PixNewreditCardForm closeModal={closeModal} />
    </PixProfileModalLayout>
  );
};

export default PixNewCreditCardModal;
