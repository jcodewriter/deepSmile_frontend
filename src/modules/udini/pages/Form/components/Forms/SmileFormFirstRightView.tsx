import useTranslation from "next-translate/useTranslation";
import { Text, Checkbox, VStack, Stack } from "@chakra-ui/core";
import { Controller, Control } from "react-hook-form";

interface SmileFormFirstRightViewProps {
  //eslint-disable-next-line
  control: Control<Record<string, any>>;
  display: string;
}

const OPTIONS = [
  {
    name: "release",
    defaultValue: true,
    label: "formFirstStepRightSectionFirstOption",
  },
  {
    name: "design",
    defaultValue: false,
    label: "formFirstStepRightSectionSecondOption",
  },
  {
    name: "beta",
    defaultValue: false,
    label: "formFirstStepRightSectionThirdOption",
  },
];

const SmileFormFirstRightView = ({ control, display }: SmileFormFirstRightViewProps) => {
  const { t } = useTranslation();

  return (
    <Stack
      display={display}
      spacing={{ base: "50px", md: "130px" }}
      paddingTop={{ base: "30px", md: "120px" }}
    >
      <Stack
        spacing="15px"
        fontFamily="Montserrat"
        fontStyle="normal"
        textAlign="center"
        color="#222222"
      >
        <Text fontWeight="bold" fontSize="40px" lineHeight="49px">
          {t("udiniSmile:formFirstStepRightSection")}
        </Text>
        <Text fontWeight="600" fontSize="16px" lineHeight="20px">
          {t("udiniSmile:formFirstStepRightSectionText")}
        </Text>
      </Stack>
      <VStack spacing="80px" align="flex-start">
        {OPTIONS.map((option) => (
          <Controller
            key={option.name}
            control={control}
            name={option.name}
            defaultValue={option.defaultValue}
            render={(props) => (
              <Checkbox
                colorScheme="pink"
                onChange={(e) => props.onChange(e.target.checked)}
                isChecked={props.value}
              >
                <Text
                  fontFamily="Montserrat"
                  fontStyle="normal"
                  fontWeight="bold"
                  fontSize="20px"
                  lineHeight="24px"
                  color="#222222"
                >
                  {t(`udiniSmile:${option.label}`)}
                </Text>
              </Checkbox>
            )}
          />
        ))}
      </VStack>
    </Stack>
  );
};

export default SmileFormFirstRightView;
