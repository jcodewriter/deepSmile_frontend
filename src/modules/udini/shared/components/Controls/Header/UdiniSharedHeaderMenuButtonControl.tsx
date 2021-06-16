import React from "react";
import Router from "next-translate/Router";
import { Menu, MenuButton, MenuList, MenuItem, Box, Flex } from "@chakra-ui/core";
import { ArrowDown } from "src/shared/components/Shapes";
import customTheme from "src/utils/theme";

export type UdiniSharedHeaderMenuLinkType = {
  text: string;
  href: string;
};

interface UdiniSharedHeaderMenuButtonControlProps {
  title: string;
  items: Array<UdiniSharedHeaderMenuLinkType>;
}

const UdiniSharedHeaderMenuButtonControl = ({
  title,
  items,
}: UdiniSharedHeaderMenuButtonControlProps) => {
  const { textStyles } = customTheme;
  const menuButtonStyle = {
    ...textStyles.menu,
    color: "black",
    _active: { color: "brandPink.100" },
    _focus: { color: "brandPink.100" },
    _hover: { color: "brandPink.100" },
  };

  const menuItemStyle = {
    ...menuButtonStyle,
    _active: { color: "brandPink.100", backgroundColor: "brandGrey.800" },
    _focus: { color: "brandPink.100", backgroundColor: "brandGrey.800" },
    _hover: { color: "brandPink.100", backgroundColor: "brandGrey.800" },
  };

  return (
    <Menu autoSelect={false} placement="bottom">
      {({ isOpen }) => (
        <>
          <MenuButton isActive={isOpen} sx={menuButtonStyle}>
            <Flex direction="column" align="center">
              <Box>{title}</Box>
              <ArrowDown sx={menuButtonStyle} />
            </Flex>
          </MenuButton>
          <MenuList bg="brandGrey.900" border="0px">
            {items.map((item) => (
              <MenuItem
                key={item.text}
                as="button"
                onClick={() => Router.pushI18n(item.href)}
                sx={menuItemStyle}
              >
                {item.text}
              </MenuItem>
            ))}
          </MenuList>
        </>
      )}
    </Menu>
  );
};

export default UdiniSharedHeaderMenuButtonControl;
