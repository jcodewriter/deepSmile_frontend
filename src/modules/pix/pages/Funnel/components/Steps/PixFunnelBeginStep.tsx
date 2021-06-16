import React from "react";
import { Flex, Stack, Heading, Text, Link } from "@chakra-ui/core";
import PixSharedCenteredBlock from "src/modules/pix/shared/components/Blocks/PixSharedCenteredBlock";
import { pushNext, PIX_HOME_ROUTE, PIX_FUNNEL_ROUTE } from "src/utils/constants/routes";
import PixSharedHeaderView from "src/modules/pix/shared/components/Views/PixSharedHeaderView";
import useTranslation from "next-translate/useTranslation";
import { PixMidTitle } from "src/shared/components/Titles";
import SharedGradientButtonLink from "src/shared/components/Button/SharedGradientButton";

const PixFunnelBeginStep = () => {
  const { t, lang } = useTranslation();

  const onGoHome = () => {
    pushNext(PIX_HOME_ROUTE, undefined, { lang });
  };

  return (
    <>
      <PixSharedHeaderView isImport={false} />
      <Flex
        as="main"
        minHeight="calc(100vh - 80px)"
        align="center"
        justify="center"
        backgroundColor="brandBlue.100"
      >
        <PixSharedCenteredBlock>
          <Stack spacing="30px" textAlign="center" bg="brandGrey.100">
            <PixMidTitle>{t("pixFunnel:cardTitle")}</PixMidTitle>
            <Heading fontWeight="normal" fontSize="24px" lineHeight="29px"></Heading>
            <Text fontSize="14px" lineHeight="176%">
              {t("pixFunnel:cardText")}
            </Text>
            <SharedGradientButtonLink
              background="white"
              color="black"
              w="360px"
              href={`${PIX_FUNNEL_ROUTE}?stage=faceZoomLevel`}
              shallow
            >
              {t("pixFunnel:cardButton")}
            </SharedGradientButtonLink>

            <Link
              onClick={onGoHome}
              fontSize="14px"
              lineHeight="17px"
              fontWeight="bold"
              color="black"
            >
              {t("pixFunnel:cardLink")}
            </Link>
          </Stack>
        </PixSharedCenteredBlock>
      </Flex>
    </>
  );
};

export default PixFunnelBeginStep;
