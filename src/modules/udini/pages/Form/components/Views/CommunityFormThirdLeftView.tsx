import useTranslation from "next-translate/useTranslation";
import { MidTitle, Subtitle } from "src/modules/udini/shared/components/Views/UdiniSharedTextsView";
import UdiniFormLeftLayout from "../Layouts/UdiniFormLeftLayout";

const CommunityFormThirdLeftView = () => {
  const { t } = useTranslation();
  return (
    <UdiniFormLeftLayout>
      <MidTitle color="white"> {t("udiniSmile:formConfirmationStepLeftSectionTitle")}</MidTitle>
      <Subtitle color="white"> {t("udiniSmile:formConfirmationStepLeftSectionFirstText")}</Subtitle>
      <Subtitle color="white">{t("udiniSmile:formConfirmationStepLeftSectionSecondText")}</Subtitle>
    </UdiniFormLeftLayout>
  );
};

export default CommunityFormThirdLeftView;
