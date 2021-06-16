import React from "react";
import UdiniCommunityTitleView from "./components/Views/UdiniCommunityTitleView";
import UdiniCommunityDescriptionView from "./components/Views/UdiniCommunityDescriptionView";
import UdiniCommunityImproveView from "./components/Views/UdiniCommunityImproveView";
import UdiniCommunityShareView from "./components/Views/UdiniCommunityShareView";
import UdiniCommunitySocialView from "./components/Views/UdiniCommunitySocialView";
import UdiniCommunityProcessView from "./components/Views/UdiniCommunityProcessView";
import withUdiniSharedPageLayout from "src/modules/udini/shared/hocs/withUdiniSharedPageLayout";

const UdiniCommunity = () => {
  return (
    <>
      <UdiniCommunityTitleView />
      <UdiniCommunityDescriptionView />
      <UdiniCommunityProcessView />
      <UdiniCommunityImproveView />
      <UdiniCommunityShareView />
      <UdiniCommunitySocialView />
    </>
  );
};

export default withUdiniSharedPageLayout(UdiniCommunity);
