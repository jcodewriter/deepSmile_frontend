import React, { ReactNode, useState } from "react";
import { Flex, Box, Stack, Image } from "@chakra-ui/core";

import PixSharedSidebarDefaultView from "src/modules/pix/shared/components/Views/PixSharedSidebarDefaultView";
import PixSharedSidebarProfilView from "src/modules/pix/shared/components/Views/PixSharedSidebarProfilView";
import PixSharedSidebarBottomView from "../Views/PixSharedSidebarBottomView";

import { PIX_HOME_ROUTE, pushNext } from "src/utils/constants/routes";
import PixImportDialog from "src/modules/pix/pages/Import/components/Control/PixImportDialog";
import useTranslation from "next-translate/useTranslation";

const PixSharedSidebarLayout = ({
  children,
  isProfile = false,
  isDirty = false,
}: {
  children: ReactNode;
  isProfile?: boolean;
  isDirty?: boolean;
}) => {
  const { lang } = useTranslation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogArgs, setDialogArgs] = useState({
    href: "",
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    func() {},
    shallow: false,
  });

  const onCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const onConfirmDialog = () => {
    onCloseDialog();
    if (dialogArgs.href) {
      pushNext(dialogArgs.href, undefined, { lang, shallow: dialogArgs.shallow });
    } else {
      dialogArgs.func();
    }
  };

  return (
    <>
      <Flex minH="100vh">
        <Flex
          as="aside"
          direction="column"
          justify="space-between"
          bg="brandBlue.100"
          padding="10px 30px 60px 30px"
          minW="280px"
          w="280px"
        >
          <Stack spacing="30px">
            <Image
              onClick={() => {
                if (isDirty) {
                  setDialogArgs((prev) => ({ ...prev, href: PIX_HOME_ROUTE }));
                  setIsDialogOpen(true);
                } else {
                  pushNext(PIX_HOME_ROUTE, undefined, { lang });
                }
              }}
              cursor="pointer"
              src="/svg/PixSmall.svg"
              fallbackSrc="/svg/PixSmall.svg"
              width="140px"
              height="70px"
              pt="10px"
            />

            {isProfile ? (
              <PixSharedSidebarProfilView />
            ) : (
              <PixSharedSidebarDefaultView
                isDirty={isDirty}
                setDialogArgs={setDialogArgs}
                setIsDialogOpen={setIsDialogOpen}
              />
            )}
          </Stack>
          <PixSharedSidebarBottomView
            isDirty={isDirty}
            setDialogArgs={setDialogArgs}
            setIsDialogOpen={setIsDialogOpen}
          />
        </Flex>
        <Box w="100%" as="main">
          {children}
        </Box>
      </Flex>
      <PixImportDialog
        isOpen={isDialogOpen}
        onClose={onCloseDialog}
        onConfirm={onConfirmDialog}
        isDirty={isDirty}
      />
    </>
  );
};

export default PixSharedSidebarLayout;
