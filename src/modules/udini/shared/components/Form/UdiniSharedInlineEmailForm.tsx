import { FormControl, FormErrorMessage, Input, SimpleGrid, useToast } from "@chakra-ui/core";
import useTranslation from "next-translate/useTranslation";
import { useForm } from "react-hook-form";
import { SharedGradientSubmitButton } from "src/shared/components/Button/SharedGradientButton";

interface FormData {
  email: string;
}
const UdiniSharedInlineEmailForm = ({ isHome = false }: { isHome?: boolean }) => {
  const toast = useToast();
  const { t } = useTranslation();
  const formMethods = useForm<FormData, MouseEvent>();
  const { handleSubmit, register, errors } = formMethods;
  const onSubmit = handleSubmit((values) => {
    const Airtable = require("airtable");
    const base = new Airtable({ apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY }).base(
      "appqSaVpzq79ytmlu"
    );

    base("V2 Emails").create(
      [
        {
          fields: {
            email: values.email,
          },
        },
      ],
      //eslint-disable-next-line
      function (err: any) {
        if (err) {
          console.error(err);
          return;
        }
      }
    );
    toast({
      title: t("udiniHomeV2:toast"),
      status: "success",
      duration: 3000,
      position: "top",
      isClosable: false,
    });
  });

  return (
    <form onSubmit={onSubmit}>
      <SimpleGrid
        columns={{ base: 1, sm: 2 }}
        columnGap="20px"
        rowGap="20px"
        justifyItems="center"
        align="center"
      >
        <FormControl id="email" isInvalid={!!errors.email}>
          <Input
            ref={register}
            border="1px solid #C7C5C5"
            borderRadius="74px"
            variant="unstyled"
            placeholder={t("udiniHomeV2:smileEmailPlaceholder")}
            minW="245px"
            maxW="360px"
            w={{ base: "245px", xs: "280px", sm: "360px" }}
            textAlign="center"
            justifyItems="center"
            h="50px"
            name="email"
            isRequired
          />
          <FormErrorMessage>{errors.email}</FormErrorMessage>
        </FormControl>

        <SharedGradientSubmitButton
          type="submit"
          minW={isHome ? "150px" : "245px"}
          maxW={isHome ? "initial" : "360px"}
          w={{ base: "245px", xs: "280px", sm: isHome ? "150px" : "360px" }}
          height="46px"
          variant="white_bg"
        >
          {t("udiniHomeV2:smileButton")}
        </SharedGradientSubmitButton>
      </SimpleGrid>
    </form>
  );
};

export default UdiniSharedInlineEmailForm;
