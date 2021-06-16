import { Text, VStack } from "@chakra-ui/core";
import useTranslation from "next-translate/useTranslation";
import UdiniSharedInlineEmailForm from "src/modules/udini/shared/components/Form/UdiniSharedInlineEmailForm";

import MainBox from "src/modules/udini/shared/components/Views/UdiniSharedMainBoxView";

const UdiniProductsEmailView = () => {
  const { t } = useTranslation();
  return (
    <MainBox>
      <VStack
        spacing={{ base: "20px", sm: "74px" }}
        justifyContent="center"
        alignItems="center"
        paddingTop={{ base: "87px", sm: "129px" }}
        paddingBottom={{ base: "107px", sm: "327px" }}
      >
        <Text
          maxWidth="1000px"
          fontFamily="Montserrat"
          fontStyle="normal"
          fontWeight="normal"
          fontSize={{ base: "26px", sm: "40px" }}
          lineHeight={{ base: "32px", sm: "49px" }}
          textAlign="center"
        >
          {t("udiniProducts:emailText")}
        </Text>
        <UdiniSharedInlineEmailForm />
      </VStack>
    </MainBox>
  );
};

export default UdiniProductsEmailView;
