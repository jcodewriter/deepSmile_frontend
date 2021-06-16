import React from "react";
import UdiniAboutTitleView from "./components/Views/UdiniAboutTitleView";
import UdiniAboutDifferenceView from "./components/Views/UdiniAboutDifferenceView";
import UdiniAboutPartnersView from "./components/Views/UdiniAboutPartnersView";
import UdiniAboutQuotesView from "./components/Views/UdiniAboutQuotesView";
import UdiniAboutTechDataView from "./components/Views/UdiniAboutTechDataView";
import UdiniAboutStoryView from "./components/Views/UdiniAboutStoryView";
import UdiniAboutTeamView from "./components/Views/UdiniAboutTeamView";
import withUdiniSharedPageLayout from "src/modules/udini/shared/hocs/withUdiniSharedPageLayout";

const UdiniAbout = () => (
  <>
    <UdiniAboutTitleView />
    <UdiniAboutDifferenceView />
    <UdiniAboutPartnersView />
    <UdiniAboutQuotesView />
    <UdiniAboutTechDataView />
    <UdiniAboutStoryView />
    <UdiniAboutTeamView />
  </>
);
export default withUdiniSharedPageLayout(UdiniAbout);
