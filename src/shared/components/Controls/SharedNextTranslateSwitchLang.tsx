import React from "react";
import useTranslation from "next-translate/useTranslation";
import { Text, TextProps } from "@chakra-ui/core";
import i18Config from "i18n.json";
import { useAuthDispatch } from "src/shared/contexts/AuthContext";
import { rerouteToLang } from "src/utils/constants/routes";

const { allLanguages } = i18Config;

const SharedNextTranslateSwitchLang = (props: TextProps) => {
  const { lang } = useTranslation();
  const { setPrefLang } = useAuthDispatch();

  const currentIndex = allLanguages.findIndex((obj) => obj === lang);
  const nextLang = allLanguages[(currentIndex + 1) % allLanguages.length];

  const rerouteToNextLang = () => {
    setPrefLang(nextLang);
    rerouteToLang(nextLang);
  };

  return (
    <Text
      as="button"
      onClick={rerouteToNextLang}
      {...props}
      color="black"
      _focus={{ outline: "none !important" }}
    >
      {nextLang.toUpperCase()}
    </Text>
  );
};

export default SharedNextTranslateSwitchLang;
