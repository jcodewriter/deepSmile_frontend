import useTranslation from "next-translate/useTranslation";
import {
  FormControl,
  FormLabel,
  Select,
  Input,
  Textarea,
  FormErrorMessage,
  HStack,
  VStack,
} from "@chakra-ui/core";

interface CommunityFormSecondRightViewProps {
  //eslint-disable-next-line
  register: any;
  display: string;
  //eslint-disable-next-line
  errors: any;
}

const CommunityFormSecondRightView = ({
  register,
  display,
  errors,
}: CommunityFormSecondRightViewProps) => {
  const { t } = useTranslation();
  return (
    <VStack spacing="35px" marginTop="120px" display={display}>
      <HStack spacing="61px">
        <FormControl id="work" minH="100px" isInvalid={!!errors.work}>
          <FormLabel
            fontFamily="Montserrat"
            fontStyle="normal"
            fontWeight="600"
            fontSize="16px"
            lineHeight="20px"
            color="#222222"
          >
            {t("udiniSmile:formSecondStepRightSectionUserLabel")}
          </FormLabel>
          <Select ref={register} placeholder="Dentiste, ortho, assistant(e)" name="work">
            <option value="dentist">
              {t("udiniSmile:formSecondStepRightSectionUserDentistOption")}
            </option>
            <option value="ortho">
              {t("udiniSmile:formSecondStepRightSectionUserOrthoOption")}
            </option>
            <option value="assistant">
              {t("udiniSmile:formSecondStepRightSectionUserAssistantOption")}
            </option>
            <option value="Udini fan">{t("udiniSmile:formSecondSetpRightSectionFanOption")}</option>
          </Select>
          <FormErrorMessage>{errors.work && errors.work.message}</FormErrorMessage>
        </FormControl>
        <FormControl id="name" minH="100px" isInvalid={!!errors.name}>
          <FormLabel
            fontFamily="Montserrat"
            fontStyle="normal"
            fontWeight="600"
            fontSize="16px"
            lineHeight="20px"
            color="#222222"
          >
            {t("udiniSmile:formSecondStepRightSectionNameLabel")}
          </FormLabel>
          <Input name="name" ref={register({ required: t("form:formRequiredField") })} />
          <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
        </FormControl>
      </HStack>
      <HStack spacing="61px">
        <FormControl id="phone" minH="100px" isInvalid={!!errors.phone}>
          <FormLabel
            fontFamily="Montserrat"
            fontStyle="normal"
            fontWeight="600"
            fontSize="16px"
            lineHeight="20px"
            color="#222222"
          >
            {t("udiniSmile:formSecondStepRightSectionPhoneLabel")}
          </FormLabel>
          <Input name="phone" ref={register} />
          <FormErrorMessage>{errors.phone && errors.phone.message}</FormErrorMessage>
        </FormControl>
        <FormControl id="email" minH="100px" isInvalid={!!errors.email}>
          <FormLabel
            fontFamily="Montserrat"
            fontStyle="normal"
            fontWeight="600"
            fontSize="16px"
            lineHeight="20px"
            color="#222222"
          >
            {t("udiniSmile:formSecondStepRightSectionEmailLabel")}
          </FormLabel>
          <Input
            name="email"
            type="email"
            ref={register({ required: t("form:formRequiredField") })}
          />
          <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
        </FormControl>
      </HStack>

      <FormControl id="message" minHeight="150px" isInvalid={!!errors.message}>
        <FormLabel
          fontFamily="Montserrat"
          fontStyle="normal"
          fontWeight="600"
          fontSize="16px"
          lineHeight="20px"
          color="#222222"
        >
          {t("udiniSmile:formSecondStepRightSectionMessageLabel")}
        </FormLabel>
        <Textarea minHeight="120px" name="message" ref={register} />
        <FormErrorMessage>{errors.message && errors.message.message}</FormErrorMessage>
      </FormControl>
    </VStack>
  );
};

export default CommunityFormSecondRightView;
