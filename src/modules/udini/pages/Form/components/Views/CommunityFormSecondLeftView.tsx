import useTranslation from "next-translate/useTranslation";
import { MidTitle, Subtitle } from "src/modules/udini/shared/components/Views/UdiniSharedTextsView";
import UdiniFormLeftLayout from "../Layouts/UdiniFormLeftLayout";

const CommunityFormSecondLeftView = () => {
  const { t } = useTranslation();
  return (
    <UdiniFormLeftLayout>
      <MidTitle color="white"> {t("udiniSmile:formSecondStepLeftSectionTitle")}</MidTitle>
      <Subtitle color="white"> {t("udiniSmile:formSecondStepLeftSectionFirstText")}</Subtitle>
    </UdiniFormLeftLayout>
  );
};

export default CommunityFormSecondLeftView;
