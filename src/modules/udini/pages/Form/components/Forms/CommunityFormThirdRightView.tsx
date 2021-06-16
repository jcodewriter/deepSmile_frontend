import useTranslation from "next-translate/useTranslation";
import { Box, Image, SimpleGrid, Text, Link } from "@chakra-ui/core";
import {
  UDINI_SOCIAL_FACEBOOK,
  UDINI_SOCIAL_INSTAGRAM,
  UDINI_SOCIAL_LINKEDIN,
} from "src/utils/constants/udini";

interface CommunityFormThirdRightViewProps {
  display: string;
}

const CommunityFormThirdRightView = ({ display }: CommunityFormThirdRightViewProps) => {
  const { t } = useTranslation();
  return (
    <Box w="100%" h="100%" display={display}>
      <SimpleGrid columns={4} spacing="15px" pt="106px">
        {Array.from({ length: 12 }, (_, k) => (
          <Image key={k} src="/svg/udini-icon-pink.svg" w="89px" h="104px" />
        ))}
      </SimpleGrid>
      <Box
        pt="109px"
        fontFamily="Montserrat"
        fontStyle="normal"
        fontWeight="bold"
        fontSize="20px"
        lineHeight="24px"
        textAlign="center"
        color="black"
        justify="center"
      >
        <Text>{t("udiniSmile:formConfirmationStepRightSectionText1")}</Text>
        <Text>{t("udiniSmile:formConfirmationStepRightSectionText2")}</Text>
      </Box>
      <SimpleGrid
        pt="72px"
        columns={3}
        spacing="120px"
        justifyContent="center"
        alignItems="flex-end"
      >
        <Link isExternal={true} href={UDINI_SOCIAL_FACEBOOK}>
          <Image cursor="pointer" src="/svg/community/facebook.svg" w="37px" h="80px"></Image>
        </Link>
        <Link isExternal={true} href={UDINI_SOCIAL_INSTAGRAM}>
          <Image src="/svg/community/instagram-black.svg" w="76px" h="76px"></Image>
        </Link>
        <Link isExternal={true} href={UDINI_SOCIAL_LINKEDIN}>
          <Image src="/svg/community/linkedin.svg" w="81px" h="81px"></Image>
        </Link>
      </SimpleGrid>
    </Box>
  );
};

export default CommunityFormThirdRightView;
