import React, { useEffect, useContext } from "react";
import UdiniPixTitleView from "./components/Views/UdiniPixTitleView";
import UdiniPixPartnersView from "./components/Views/UdiniPixPartnersView";
import UdiniPixProcessView from "./components/Views/UdiniPixProcessView";
import UdiniPixCountView from "./components/Views/UdiniPixCountView";
import UdiniPixTestimonialView from "./components/Views/UdiniPixTestimonialView";
import UdiniPixPricingView from "./components/Views/UdiniPixPricingView";
import withUdiniSharedPageLayout from "../../shared/hocs/withUdiniSharedPageLayout";

import { SmoothScrollContext } from "src/shared/contexts/SmoothScrollContext";

const UdiniPix = () => {
  const { scroll } = useContext(SmoothScrollContext);
  useEffect(() => {
    scroll && scroll.destroy();
  });

  return (
    <>
      <UdiniPixTitleView />
      <UdiniPixPartnersView />
      <UdiniPixProcessView />
      <UdiniPixCountView />
      <UdiniPixTestimonialView />
      <UdiniPixPricingView />
    </>
  );
};

export default withUdiniSharedPageLayout(UdiniPix);
