import useTranslation from "next-translate/useTranslation";
import { MidTitle, Subtitle } from "src/modules/udini/shared/components/Views/UdiniSharedTextsView";
import UdiniFormLeftLayout from "../Layouts/UdiniFormLeftLayout";

const CommunityFormFirstLeftView = () => {
  const { t } = useTranslation();
  return (
    <UdiniFormLeftLayout>
      <MidTitle color="white"> {t("udiniCommunity:formLeftSectionTitle")}</MidTitle>
      <Subtitle color="white"> {t("udiniCommunity:formLeftSectionFirstItem")}</Subtitle>
      <Subtitle color="white"> {t("udiniCommunity:formLeftSectionSecondItem")}</Subtitle>
      <Subtitle color="white"> {t("udiniCommunity:formLeftSectionThirdItem")}</Subtitle>
    </UdiniFormLeftLayout>
  );
};

export default CommunityFormFirstLeftView;
