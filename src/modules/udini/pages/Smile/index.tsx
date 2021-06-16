import React from "react";
import UdiniSmileTitleView from "./components/Views/UdiniSmileTitleView";
import UdiniSmileDescriptionView from "./components/Views/UdiniSmileDescriptionView";
import UdiniSmileAmbitionView from "./components/Views/UdiniSmileAmbitionView";
import UdiniSmileWorksView from "./components/Views/UdiniSmileWorksView";
import UdiniSmileCommunitySectionView from "./components/Views/UdiniSmileCommunitySectionView";
import withUdiniSharedPageLayout from "../../shared/hocs/withUdiniSharedPageLayout";

const UdiniSmile = () => {
  return (
    <>
      <UdiniSmileTitleView />
      <UdiniSmileDescriptionView />
      <UdiniSmileAmbitionView />
      <UdiniSmileWorksView />
    </>
  );
};

export default withUdiniSharedPageLayout(UdiniSmile, true, UdiniSmileCommunitySectionView);
