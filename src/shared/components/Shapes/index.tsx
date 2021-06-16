import React from "react";
import { Icon, IconProps } from "@chakra-ui/core";

export const ArrowDown = ({ color, _hover, _focus, _active, boxSize }: IconProps) => {
  return (
    <Icon color={color} _hover={_hover} _focus={_focus} _active={_active} boxSize={boxSize}>
      <svg
        width="16.5"
        height="15"
        viewBox="0 0 11 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.48483 4.24264L5.24219 8.48528L0.999547 4.24264"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    </Icon>
  );
};

export const TiltedPlus = ({ color, ...rest }: IconProps) => {
  return (
    <Icon color={color} {...rest}>
      <svg
        width="20"
        height="19"
        viewBox="0 0 20 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="19.6777"
          y="2.60571"
          width="23"
          height="3.5"
          transform="rotate(135 19.6777 2.60571)"
          fill="currentColor"
        />
        <rect
          x="3.41406"
          y="0.130859"
          width="23"
          height="3.5"
          transform="rotate(45 3.41406 0.130859)"
          fill="currentColor"
        />
      </svg>
    </Icon>
  );
};
