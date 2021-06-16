import PixSharedBodyLayout from "src/modules/pix/shared/components/Layouts/PixSharedBodyLayout";
import PixChangePlanForm from "src/modules/pix/pages/Subscription/components/Forms/PixChangePlanForm";
import useTranslation from "next-translate/useTranslation";
import PixSharedPageTileView from "src/modules/pix/shared/components/Views/PixSharedPageTileView";

const PixChangePlanView = () => {
  const { t } = useTranslation();
  return (
    <PixSharedBodyLayout>
      <PixSharedPageTileView pageTitle={t("pixSubscription:subscriptionTitle")} />
      <PixChangePlanForm />
    </PixSharedBodyLayout>
  );
};

export default PixChangePlanView;
