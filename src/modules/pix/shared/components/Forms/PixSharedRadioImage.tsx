import React from "react";
import { useFormContext } from "react-hook-form";
import { Box, Flex, useRadio } from "@chakra-ui/core";
import ImageWithSkeleton from "src/shared/components/ImageWithSkeleton";

interface PixSharedRadioImageProps {
  value?: string;
  children?: string;
  name?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange?: (eventOrValue: any) => void;
  isChecked?: boolean;
  width: string;
  imageSrc: string;
}

const PixSharedRadioImage = ({ imageSrc, width, ...props }: PixSharedRadioImageProps) => {
  const { register } = useFormContext();
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box
      as="label"
      w={width}
      //cursor={props.disabled ? "not-allowed" : "url(/svg/radioImageCursor.svg), auto"}
    >
      <input {...input} ref={register} />
      <Box borderRadius="20px">
        <Flex
          {...checkbox}
          justify="center"
          align="center"
          height="53px"
          borderWidth="1px"
          color="brandBlue.100"
          borderTopLeftRadius="20px"
          borderTopRightRadius="20px"
          fontWeight="bold"
          fontSize="16px"
          lineHeight="36px"
          bg="white"
          _checked={{
            bg: "brandBlue.100",
            color: "white",
            borderColor: "brandBlue.100",
          }}
        >
          {props.children}
        </Flex>
        <ImageWithSkeleton
          borderBottomLeftRadius="20px"
          borderBottomRightRadius="20px"
          fit="cover"
          src={imageSrc}
        />
      </Box>
    </Box>
  );
};

export default PixSharedRadioImage;
