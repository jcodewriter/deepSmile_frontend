import React, { ReactText } from "react";
import { Stack, Flex, Text, Link } from "@chakra-ui/core";
import { useAuthState } from "src/shared/contexts/AuthContext";
import useTranslation from "next-translate/useTranslation";

interface GetPostsProps {
  t: (key: string, query?: { [name: string]: ReactText } | undefined) => string;
}

const getPosts = ({ t }: GetPostsProps) => [
  t("pixProfileHome:profileHomeBlogPost1"),
  t("pixProfileHome:profileHomeBlogPost2"),
  t("pixProfileHome:profileHomeBlogPost3"),
];

const PixHomePostListBlock = () => {
  const { profile } = useAuthState();
  const { t } = useTranslation();

  return (
    <Stack spacing="0px">
      <Flex
        bg="#F6F6F6"
        border="1px solid #CCCCCC"
        borderRadius="4px 4px 0px 0px"
        h="72px"
        align="center"
        paddingLeft="24px"
      >
        <Text fontSize="20px" lineHeight="24px">
          {" "}
          {t("pixProfileHome:profileHomeWelcomeTitleBegin")} {profile?.infos?.firstName}
          {t("pixProfileHome:profileHomeWelcomeTitleEnd")}
        </Text>
      </Flex>
      {getPosts({ t }).map((post) => (
        <Flex
          key={post}
          bg="#FFF"
          border="1px solid #CCCCCC"
          borderRadius="4px 4px 0px 0px"
          h="52px"
          align="center"
          paddingLeft="24px"
        >
          <Text>{post}</Text>
          <Link textDecoration="underline">{t("pixProfileHome:profileHomeBlogPostRead")}</Link>
        </Flex>
      ))}
    </Stack>
  );
};

export default PixHomePostListBlock;
