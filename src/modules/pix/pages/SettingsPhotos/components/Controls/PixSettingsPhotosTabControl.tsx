import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/core";
import PixSharedFaceZoomLevelPhotosForm from "src/modules/pix/shared/components/Forms/PixSharedFaceZoomLevelPhotosForm";
import PixSharedFaceBackgroundColorPhotosForm from "src/modules/pix/shared/components/Forms/PixSharedFaceBackgroundColorPhotosForm";
import PixSharedOcclusalCutPhotosForm from "src/modules/pix/shared/components/Forms/PixSharedOcclusalCutPhotosForm";
import PixSharedIntraOralZoomLevelPhotosForm from "src/modules/pix/shared/components/Forms/PixSharedIntraOralZoomLevelPhotosForm";
import PixSharedUseMirrorPhotosForm from "src/modules/pix/shared/components/Forms/PixSharedUseMirrorPhotosForm";
import useTranslation from "next-translate/useTranslation";

const TABS = [
  {
    label: "faceZoomLevelTab",
    value: "faceZoomLevel",
    Component: PixSharedFaceZoomLevelPhotosForm,
  },
  {
    label: "faceBackgroundColorTab",
    value: "faceBackgroundColor",
    Component: PixSharedFaceBackgroundColorPhotosForm,
  },
  { label: "occlusalCutTab", value: "occlusalCut", Component: PixSharedOcclusalCutPhotosForm },
  {
    label: "intraoralZoomTab",
    value: "intraOralZoomLevel",
    Component: PixSharedIntraOralZoomLevelPhotosForm,
  },
  {
    label: "mirrorTab",
    value: "useMirror",
    Component: PixSharedUseMirrorPhotosForm,
  },
];

const PixSettingsPhotosTabControl = () => {
  const { t } = useTranslation();

  return (
    <>
      <Tabs variant="unstyled">
        <TabList>
          {TABS.map((tab) => (
            <Tab
              key={tab.value}
              color="rgba(0, 0, 0, 0.5)"
              fontFamily="Montserrat"
              fontSize="16px"
              lineHeight="20px"
              paddingLeft="0px"
              _selected={{ color: "black", fontWeight: "bold" }}
              _focus={{
                outline: "none !important",
              }}
            >
              {t(`pixSettingsPhotos:${tab.label}`)}
            </Tab>
          ))}
        </TabList>
        <TabPanels marginBottom="53px">
          {TABS.map((tab) => (
            <TabPanel key={tab.value}>
              <tab.Component />
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </>
  );
};

export default PixSettingsPhotosTabControl;
