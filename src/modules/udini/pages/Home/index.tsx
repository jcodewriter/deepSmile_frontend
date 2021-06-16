import React, { useRef, useContext } from "react";
import withUdiniSharedPageLayout from "src/modules/udini/shared/hocs/withUdiniSharedPageLayout";
import UdiniHomeHeroView from "./components/Views/UdiniHomeHeroView";
import UdiniHomeSlidingTitleView from "./components/Views/UdiniHomeSlidingTitleView";

import UdiniHomeKeyView from "./components/Views/UdiniHomeKeyView";
import UdiniHomeTeamView from "./components/Views/UdiniHomeTeamView";
import UdiniHomePartnersView from "./components/Views/UdiniHomePartnersView";
import UdiniHomePixBottomView from "./components/Views/UdiniHomePixBottomView";
import UdiniSharedSmileView from "../../shared/components/Views/UdiniSharedSmileView";
import UdiniSharedPixView from "../../shared/components/Views/UdiniSharedPixView";

import { SmoothScrollContext } from "src/shared/contexts/SmoothScrollContext";

const UdiniHome = () => {
  const { scroll } = useContext(SmoothScrollContext);
  const firstViewRef = useRef<HTMLDivElement | null>(null);
  const topViewRef = useRef<HTMLDivElement | null>(null);

  const scrollToFirstView = (event: MouseEvent) => {
    console.log("scrollToFirstView");
    event.preventDefault();
    scroll && scroll.scrollTo("#firstView");
  };

  return (
    <>
      <div ref={topViewRef}>
        <UdiniHomeHeroView onClick={scrollToFirstView} />
      </div>
      <UdiniHomeSlidingTitleView
        id="UdiniOurProductsTitle"
        flexWidth={{ base: "200%", sm: "165%" }}
        title="Nos Produits"
        img="/svg/home/udini_sliding_title_logo.svg"
        basemb="98px"
        mdmb="174px"
        basemt="80px"
        mdmt="125.47px"
        imageBaseMargin="30px"
        parallaxStart="1vw"
        parallaxSpeed="3"
        fontSize={{ base: "2em", xs: "2.5em", sm: "6em", md: "9em", lg: "8em" }}
      />
      <div id="firstView" ref={firstViewRef}>
        <UdiniSharedPixView />
      </div>
      <UdiniSharedSmileView isHome />
      <UdiniHomeSlidingTitleView
        id="UdiniKeysTitle"
        flexWidth={{ base: "200%", sm: "150%" }}
        title="La clé Udini"
        img="/svg/home/udini_key_small.svg"
        basemb="55px"
        mdmb="77px"
        basemt="151px"
        mdmt="148px"
        imageBaseMargin="30px"
        parallaxStart="1vw"
        parallaxSpeed="-3"
        fontSize={{ base: "2.5em", xs: "2.5em", sm: "6em", md: "9em", lg: "8em" }}
      />
      <UdiniHomeKeyView />
      <UdiniHomeSlidingTitleView
        id="UdiniTeamTitle"
        flexWidth={{ base: "200%", sm: "140%" }}
        title="L'équipe"
        img="/svg/home/udini_team.svg"
        basemb="28px"
        mdmb="100px"
        basemt="83px"
        mdmt="152px"
        imageBaseMargin="30px"
        parallaxStart="1vw"
        parallaxSpeed="3"
        fontSize={{ base: "2.5em", xs: "2.5em", sm: "6em", md: "9em", lg: "8em" }}
      />
      <UdiniHomeTeamView />
      <UdiniHomePartnersView />
      <UdiniHomePixBottomView />
    </>
  );
};

export default withUdiniSharedPageLayout(UdiniHome, false);
