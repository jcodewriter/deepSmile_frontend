import withUdiniSharedPageLayout from "../../shared/hocs/withUdiniSharedPageLayout";

import UdiniHomeSlidingTitleView from "../Home/components/Views/UdiniHomeSlidingTitleView";
import UdiniProductEmailView from "./components/UdiniProductsEmailView";
import UdiniProductsHeroView from "./components/UdiniProductsHeroView";
import UdiniProductsPartnersView from "./components/UdiniProductsPartnersView";
import UdiniProductsPricingView from "./components/UdiniProductsPricingView";
import UdiniProductsVideoView from "./components/UdiniProductsVideoView";

import UdiniSharedSmileView from "../../shared/components/Views/UdiniSharedSmileView";
import UdiniSharedPixView from "../../shared/components/Views/UdiniSharedPixView";

const UdiniProducts = () => {
  return (
    <>
      <UdiniProductsHeroView />
      <UdiniSharedPixView />
      <UdiniProductsPartnersView />
      <UdiniProductsPricingView />
      <UdiniProductsVideoView />
      <UdiniHomeSlidingTitleView
        id="UdiniLaunch2021Title"
        flexWidth={{ base: "220%", sm: "185%" }}
        title="Lancement en 2021"
        img="/svg/home/udini_sliding_title_logo.svg"
        basemb="76px"
        mdmb="107px"
        basemt="45px"
        mdmt="107px"
        imageBaseMargin="40px"
        parallaxStart="1vw"
        parallaxSpeed="3"
        fontSize={{ base: "1.6em", xs: "2.5em", sm: "4em", md: "9em", lg: "8em" }}
      />
      <UdiniSharedSmileView />
      <UdiniProductEmailView />
    </>
  );
};

export default withUdiniSharedPageLayout(UdiniProducts, false);
