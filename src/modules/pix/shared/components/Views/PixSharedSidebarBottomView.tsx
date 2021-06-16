/* eslint-disable @typescript-eslint/no-empty-function */
import React, { Dispatch, SetStateAction } from "react";
import { Box, HStack, Stack, Link, Button } from "@chakra-ui/core";

import useTranslation from "next-translate/useTranslation";
import {
  pushNext,
  UDINI_CONTACT_ROUTE,
  UDINI_HOME_ROUTE,
  UDINI_FAQ_ROUTE,
} from "src/utils/constants/routes";
import { useAuthDispatch } from "src/shared/contexts/AuthContext";

const PixSharedSidebarBottomView = ({
  isDirty = false,
  setDialogArgs,
  setIsDialogOpen,
}: {
  isDirty: boolean;
  setDialogArgs: Dispatch<SetStateAction<{ href: string; func: () => void; shallow: boolean }>>;
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { t, lang } = useTranslation();
  const { disconnect } = useAuthDispatch();

  return (
    <Stack spacing="50px">
      <Stack spacing="16px">
        <HStack
          spacing="5px"
          opacity="0.7"
          _hover={{
            opacity: 1,
          }}
          onClick={() => {
            if (isDirty) {
              setDialogArgs((prev) => ({
                ...prev,
                href: "",
                func() {
                  disconnect();
                  pushNext(UDINI_HOME_ROUTE, undefined, { lang });
                },
              }));
              setIsDialogOpen(true);
            } else {
              disconnect();
              pushNext(UDINI_HOME_ROUTE, undefined, { lang });
            }
          }}
        >
          <Box h="24px" w="24px" bg="white" borderRadius="50%" />
          <Link color="white" fontWeight="500" fontSize="14px" lineHeight="20px">
            {t("pixSidebar:logoutLink")}
          </Link>
        </HStack>
        {[
          { text: "helpLink", link: UDINI_FAQ_ROUTE },
          { text: "issueLink", link: UDINI_CONTACT_ROUTE },
        ].map((elem) => (
          <HStack
            key={elem.text}
            spacing="5px"
            opacity="0.7"
            _hover={{
              opacity: 1,
            }}
            onClick={() => {
              if (isDirty) {
                setDialogArgs((prev) => ({
                  ...prev,
                  href: elem.link,
                  func() {},
                  shallow: false,
                }));
                setIsDialogOpen(true);
              } else {
                pushNext(elem.link, undefined, { lang });
              }
            }}
          >
            <Box h="24px" w="24px" bg="white" borderRadius="50%" />

            <Link color="white" fontWeight="500" fontSize="14px" lineHeight="20px">
              {t(`pixSidebar:${elem.text}`)}
            </Link>
          </HStack>
        ))}
      </Stack>

      <Button
        fontStyle="normal"
        fontWeight="bold"
        fontSize="14px"
        lineHeight="17px"
        color="#FFFFFF"
        background="#0C404D"
        borderRadius="25px"
        _hover={{
          backgroundColor: "#FFFFFF",
          color: "#0C404D",
        }}
        onClick={() => {
          if (isDirty) {
            setDialogArgs((prev) => ({
              ...prev,
              href: UDINI_HOME_ROUTE,
              func() {},
              shallow: false,
            }));
            setIsDialogOpen(true);
          } else {
            pushNext(UDINI_HOME_ROUTE, undefined, { lang });
          }
        }}
      >
        {t("pixSidebar:udiniLink")}
      </Button>
    </Stack>
  );
};

export default PixSharedSidebarBottomView;
