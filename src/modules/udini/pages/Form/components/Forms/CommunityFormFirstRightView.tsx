import useTranslation from "next-translate/useTranslation";
import { Checkbox, VStack, Stack } from "@chakra-ui/core";
import { Controller, Control } from "react-hook-form";
import {
  FormTitle,
  Menu,
  MidTitle,
} from "src/modules/udini/shared/components/Views/UdiniSharedTextsView";

interface CommunityFormFirstRightViewProps {
  //eslint-disable-next-line
  control: Control<Record<string, any>>;
  display: string;
}

const OPTIONS = [
  {
    name: "evolution",
    defaultValue: true,
    label: "formRightSectionFirstOption",
  },
  {
    name: "beta",
    defaultValue: false,
    label: "formRightSectionSecondOption",
  },
  {
    name: "sugggest",
    defaultValue: false,
    label: "formRightSectionThirdOption",
  },
];

const CommunityFormFirstRightView = ({ control, display }: CommunityFormFirstRightViewProps) => {
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
        <MidTitle>{t("udiniCommunity:formRightSectionTitle")}</MidTitle>

        <Menu> {t("udiniCommunity:formRightSectionText")}</Menu>
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
                <FormTitle color="#222" fontWeight="bold">
                  {" "}
                  {t(`udiniCommunity:${option.label}`)}
                </FormTitle>
              </Checkbox>
            )}
          />
        ))}
      </VStack>
    </Stack>
  );
};

export default CommunityFormFirstRightView;
