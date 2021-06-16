import React from "react";
import { useAuth } from "src/shared/contexts/AuthContext";
import { Flex, HStack, Text, Image, Avatar } from "@chakra-ui/core";
import useTranslation from "next-translate/useTranslation";
import SharedNextTranslateLink from "src/shared/components/Controls/SharedNextTranslateLink";
import { PIX_HOME_ROUTE } from "src/utils/constants/routes";
import CommonHelper from "src/utils/helpers/CommonHelper";

const PixFunnelHeaderView = () => {
  const { t } = useTranslation();
  const [{ profile }] = useAuth();

  return (
    <Flex justify="space-between" paddingX="22px" align="center" h="100%">
      <SharedNextTranslateLink href={`${PIX_HOME_ROUTE}?page=home`}>
        <Image src="/svg/PixSmall.svg" widht="80px" height="47px" />
      </SharedNextTranslateLink>
      <HStack spacing="16px">
        <Text fontSize="14px" lineHeight="146.62%" fontWeight="bold" color="white">
          {t("pixFunnel:greeting")} {profile ? profile.infos?.firstName : "Inconnu"}
        </Text>
        <Avatar
          size="md"
          name={`${profile?.infos?.firstName} ${profile?.infos?.lastName}`}
          src={profile?.logo ? CommonHelper.convertS3Url(profile?.logo) : ""}
        />
      </HStack>
    </Flex>
  );
};

export default PixFunnelHeaderView;
