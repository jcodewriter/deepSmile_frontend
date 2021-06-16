/* eslint-disable @typescript-eslint/no-empty-function */
import React, { Dispatch, SetStateAction } from "react";
import { HStack, Button, Link, Image, Avatar } from "@chakra-ui/core";
import { PIX_HOME_ROUTE, PIX_PHOTO_IMPORT_ROUTE, pushNext } from "src/utils/constants/routes";
import PixSharedSidebarNavLinkList from "src/modules/pix/shared/components/Controls/PixSharedSidebarNavLinkList";
import { useAuthState } from "src/shared/contexts/AuthContext";
import useTranslation from "next-translate/useTranslation";
import CommonHelper from "src/utils/helpers/CommonHelper";

const PixSharedSidebarDefaultView = ({
  isDirty = false,
  setDialogArgs,
  setIsDialogOpen,
}: {
  isDirty: boolean;
  setDialogArgs: Dispatch<SetStateAction<{ href: string; func: () => void; shallow: boolean }>>;
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { profile } = useAuthState();
  const { t, lang } = useTranslation();

  return (
    <>
      <HStack
        color="white"
        align="center"
        spacing="9px"
        cursor="pointer"
        onClick={() => {
          if (isDirty) {
            setDialogArgs((prev) => ({
              ...prev,
              href: `${PIX_HOME_ROUTE}?page=profile&stage=home`,
              shallow: true,
              func() {},
            }));
            setIsDialogOpen(true);
          } else {
            pushNext(`${PIX_HOME_ROUTE}?page=profile&stage=home`, undefined, {
              lang,
              shallow: true,
            });
          }
        }}
      >
        <Avatar
          size="md"
          name={`${profile?.infos?.firstName} ${profile?.infos?.lastName}`}
          src={profile?.logo ? CommonHelper.convertS3Url(profile?.logo) : ""}
        />
        <Link>
          {profile?.infos?.firstName} {profile?.infos?.lastName}
        </Link>
        <Image src={require("public/svg/SidebarGo.svg")} />
      </HStack>
      <Button
        cursor="pointer"
        as="a"
        p="8px 12px"
        bg="white"
        fontWeight="bold"
        fontSize="14px"
        lineHeight="17px"
        borderRadius="25px"
        color="brandBlue.100"
        onClick={() => {
          if (isDirty) {
            setDialogArgs((prev) => ({
              ...prev,
              href: PIX_PHOTO_IMPORT_ROUTE,
              shallow: false,
              func() {},
            }));
            setIsDialogOpen(true);
          } else {
            pushNext(PIX_PHOTO_IMPORT_ROUTE, undefined, {
              lang,
            });
          }
        }}
      >
        {t("pixSidebar:importPhotosButton")}
      </Button>
      <PixSharedSidebarNavLinkList
        isDirty={isDirty}
        setDialogArgs={setDialogArgs}
        setIsDialogOpen={setIsDialogOpen}
        navLinks={[
          { label: "homeNavLink", query: { page: "home" } },
          { label: "invoicesNavLink", query: { page: "invoices" } },
          { label: "settingsPhotosNavLink", query: { page: "settingsPhotos" } },
        ]}
      />
    </>
  );
};

export default PixSharedSidebarDefaultView;
