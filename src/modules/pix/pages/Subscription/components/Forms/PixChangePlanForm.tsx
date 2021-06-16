import React from "react";

import { useAuthState } from "src/shared/contexts/AuthContext";
import PixChangePlanSelectedView from "src/modules/pix/pages/Subscription/components/Views/PixChangePlanSelectedView";

const PixChangePlanForm = () => {
  const { profile } = useAuthState();

  if (!profile?.planInfos?.plan2) {
    return null;
  }

  return <PixChangePlanSelectedView />;
};

export default PixChangePlanForm;
