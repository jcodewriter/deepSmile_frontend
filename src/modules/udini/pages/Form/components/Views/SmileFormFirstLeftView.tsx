import useTranslation from "next-translate/useTranslation";
import { MidTitle, Subtitle } from "src/modules/udini/shared/components/Views/UdiniSharedTextsView";
import UdiniFormLeftLayout from "../Layouts/UdiniFormLeftLayout";

const SmileFormFirstLeftView = () => {
  const { t } = useTranslation();
  return (
    <UdiniFormLeftLayout>
      <MidTitle color="white"> {t("udiniSmile:formFirstStepLeftSectionTitle")}</MidTitle>
      <Subtitle color="white"> {t("udiniSmile:formFirstStepLeftSectionText")}</Subtitle>
    </UdiniFormLeftLayout>
  );
};

export default SmileFormFirstLeftView;
