import React from "react";
import { PixFunnelProvider } from "src/modules/pix/shared/contexts/PixFunnelContext";
import PixSettingsPhotosView from "./components/Views/PixSettingsPhotosView";

const PixSettingsPhotos = () => {
  return (
    <PixFunnelProvider>
      <PixSettingsPhotosView />
    </PixFunnelProvider>
  );
};

export default PixSettingsPhotos;
