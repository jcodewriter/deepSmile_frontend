import React from "react";
import PixSharedSidebarLayout from "src/modules/pix/shared/components/Layouts/PixSharedSidebarLayout";
import PixChangePlanView from "src/modules/pix/pages/Subscription/components/Views/PixChangePlanView";

const PixSubscription = () => {
  return (
    <PixSharedSidebarLayout isProfile>
      <PixChangePlanView />
    </PixSharedSidebarLayout>
  );
};

export default PixSubscription;
