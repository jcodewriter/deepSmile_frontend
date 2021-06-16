import React, { useState } from "react";
import UdiniSharedHeaderDesktopView from "./Desktop/UdiniSharedHeaderDesktopView";

import UdiniSharedHeaderDrawerView from "./Drawer/UdiniSharedHeaderDrawerView";

const UdiniSharedHeaderLayout = () => {
  const [isDrawerOpen, setDrawerVisibility] = useState(false);

  const handleToggleDrawer = () =>
    setDrawerVisibility((lastDrawerVisibility) => !lastDrawerVisibility);

  const handleCloseDrawer = () => setDrawerVisibility(false);

  return (
    <>
      <UdiniSharedHeaderDesktopView handleToggleDrawer={handleToggleDrawer} />
      <UdiniSharedHeaderDrawerView isOpen={isDrawerOpen} onClose={handleCloseDrawer} />
    </>
  );
};

export default UdiniSharedHeaderLayout;
