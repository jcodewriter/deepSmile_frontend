/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useCallback, Dispatch, SetStateAction } from "react";
import { Box, HStack, Stack, Link } from "@chakra-ui/core";
import useTranslation from "next-translate/useTranslation";
import { PIX_HOME_ROUTE, pushNext } from "src/utils/constants/routes";
import { useRouter } from "next/router";

interface PixSharedSidebarNavLinkType {
  label: string;
  query: {
    page: string;
    stage?: string;
  };
}

interface PixSharedSidebarNavLinkListProps {
  navLinks: PixSharedSidebarNavLinkType[];
  isDirty?: boolean;
  setDialogArgs?: Dispatch<SetStateAction<{ href: string; func: () => void; shallow: boolean }>>;
  setIsDialogOpen?: Dispatch<SetStateAction<boolean>>;
}

const PixSharedSidebarNavLinkList = ({
  navLinks,
  isDirty = false,
  setDialogArgs,
  setIsDialogOpen,
}: PixSharedSidebarNavLinkListProps) => {
  const { t, lang } = useTranslation();
  const router = useRouter();

  const getCurrentPage = useCallback(
    (navLink) => {
      if (router.query.page) {
        if (router.query.page === "profile") {
          return navLink.query.stage === router.query.stage;
        } else {
          return navLink.query.page === router.query.page;
        }
      } else {
        return navLink.query.page === "home";
      }
    },
    [router.query.page]
  );

  return (
    <Stack spacing="15px">
      {navLinks.map((navLink) => (
        <HStack
          key={navLink.label}
          spacing="5px"
          opacity={getCurrentPage(navLink) ? 1 : 0.7}
          _hover={{
            opacity: 1,
          }}
          onClick={() => {
            const href = `${PIX_HOME_ROUTE}?page=${navLink.query.page}${
              navLink.query.stage ? `&stage=${navLink.query.stage}` : ""
            }`;

            if (isDirty && setDialogArgs && setIsDialogOpen) {
              setDialogArgs((prev) => ({
                ...prev,
                href,
                func() {},
                shallow: true,
              }));
              setIsDialogOpen(true);
            } else {
              pushNext(href, undefined, { lang, shallow: true });
            }
          }}
        >
          <Box h="24px" w="24px" bg="white" borderRadius="50%" />
          <Link color="white">{t(`pixSidebar:${navLink.label}`)}</Link>
        </HStack>
      ))}
    </Stack>
  );
};

export default PixSharedSidebarNavLinkList;
