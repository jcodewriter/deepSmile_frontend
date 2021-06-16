import React from "react";
import { Flex } from "@chakra-ui/core";
import UdiniSharedHeaderConnexionView from "./UdiniSharedHeaderConnexionView";
import UdiniSharedHeaderNavView from "./UdiniSharedHeaderNavView";
import UdiniSharedHeaderBurgerControl from "../../../Controls/Header/UdiniSharedHeaderBurgerControl";
import SharedNextTranslateSwitchLang from "src/shared/components/Controls/SharedNextTranslateSwitchLang";
import UdiniSharedHeaderLogoLink from "../../../Controls/Header/UdiniSharedHeaderLogoLink";

interface UdiniSharedHeaderDesktopViewProps {
  handleToggleDrawer: () => void;
}

const UdiniSharedHeaderDesktopView = ({
  handleToggleDrawer,
}: UdiniSharedHeaderDesktopViewProps) => {
  return (
    <Flex
      as="header"
      justify={{ base: "space-evenly", md: "space-between" }}
      padding="1.5rem"
      bg="#FFFFFF"
      maxH="148px"
    >
      <Flex flex={{ base: "auto", lg: "1" }} height="100px">
        <UdiniSharedHeaderLogoLink />
      </Flex>
      <Flex
        display={{ base: "none", md: "flex" }}
        flex={{ base: "auto", lg: "1" }}
        justify="center"
        marginX="20px"
        whiteSpace="nowrap"
      >
        <UdiniSharedHeaderNavView />
      </Flex>
      <Flex
        display={{ base: "none", md: "flex" }}
        flex={{ base: "auto", lg: "1" }}
        justify="flex-end"
        whiteSpace="nowrap"
      >
        <UdiniSharedHeaderConnexionView hoverColor="white" hoverText="black" />
      </Flex>
      <Flex
        flex="1"
        align="center"
        justify="flex-end"
        display={{ base: "flex", md: "none" }}
        minW={{ base: "50px", md: "200px" }}
        cursor="pointer"
      >
        <UdiniSharedHeaderBurgerControl handleClick={handleToggleDrawer} />
      </Flex>
      <SharedNextTranslateSwitchLang
        alignSelf="center"
        justifySelf="center"
        display={{ base: "block", md: "none" }}
        cursor="pointer"
        fontWeight="600"
        color="black"
        _hover={{ color: "brandPink.100" }}
      />
    </Flex>
  );
};

export default UdiniSharedHeaderDesktopView;
