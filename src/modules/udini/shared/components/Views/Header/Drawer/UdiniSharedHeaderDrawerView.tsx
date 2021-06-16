import React from "react";
import { Drawer, DrawerOverlay, DrawerContent, Stack } from "@chakra-ui/core";
import UdiniSharedHeaderSocialLinkList from "./UdiniSharedHeaderSocialLinkList";
import UdiniSharedHeaderDrawerInfoView from "./UdiniSharedHeaderDrawerInfoView";
import UdiniSharedHeaderDrawerTopView from "./UdiniSharedHeaderDrawerTopView";
import UdiniSharedHeaderDrawerNavView from "./UdiniSharedHeaderDrawerNavView";
import UdiniSharedHeaderDrawerConnexionView from "./UdiniSharedHeaderDrawerConnexionView";

interface UdiniSharedHeaderDrawerViewProps {
  isOpen: boolean;
  onClose: () => void;
}

const UdiniSharedHeaderDrawerView = ({ isOpen, onClose }: UdiniSharedHeaderDrawerViewProps) => {
  return (
    <Drawer size="full" isOpen={isOpen} onClose={onClose} placement="top">
      <DrawerOverlay>
        <DrawerContent bg="white" padding="25px">
          <Stack>
            <UdiniSharedHeaderDrawerTopView onClose={onClose} />
            <UdiniSharedHeaderDrawerNavView />
            <UdiniSharedHeaderDrawerInfoView />
            <Stack align="center" spacing="50px">
              <UdiniSharedHeaderDrawerConnexionView />
              <UdiniSharedHeaderSocialLinkList />
            </Stack>
          </Stack>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

export default UdiniSharedHeaderDrawerView;
