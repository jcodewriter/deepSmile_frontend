import React from "react";
import { HStack, useRadioGroup } from "@chakra-ui/core";

import PixSharedRadioImage from "./PixSharedRadioImage";

interface PixSharedRadioGroupImageProps {
  name: string;
  options: { value: string; label: string; imageSrc: string; disabled?: boolean }[];
  defaultValue?: string;
  width: string;
}

const PixSharedRadioGroupImage = ({
  name,
  options,
  defaultValue,
  width,
}: PixSharedRadioGroupImageProps) => {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name,
    defaultValue,
  });

  const group = getRootProps();

  return (
    <HStack justify="center" spacing="72px" {...group}>
      {options.map(({ value, label, imageSrc }) => {
        const radio = getRadioProps({ value });
        return (
          <PixSharedRadioImage width={width} imageSrc={imageSrc} key={value} {...radio}>
            {label}
          </PixSharedRadioImage>
        );
      })}
    </HStack>
  );
};

export default PixSharedRadioGroupImage;
