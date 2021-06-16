import React, { useEffect, useContext } from "react";
import { PIX_SIGNIN_ROUTE, PIX_SIGNUP_ROUTE, pushNext } from "src/utils/constants/routes";
import useTranslation from "next-translate/useTranslation";
import hasAuthPermission from "src/modules/pix/shared/utils/hasAuthPermission";
import WithWaitForAuthentication from "src/shared/hocs/WithWaitForAuthentication";
import { useAuthState } from "src/shared/contexts/AuthContext";
import PixImportPhotos from "src/modules/pix/pages/Import";
import { PixPhotoProcessorProvider } from "src/modules/pix/pages/Import/shared/contexts/PixImportContext";
import { Flex, Spinner } from "@chakra-ui/core";
import { SmoothScrollContext } from "src/shared/contexts/SmoothScrollContext";

const PixImportPhotosPage = () => {
  const { isAuthenticated, profile } = useAuthState();
  const { lang } = useTranslation();

  const { scroll } = useContext(SmoothScrollContext);
  useEffect(() => {
    scroll && scroll.destroy();
  });

  useEffect(() => {
    if (!isAuthenticated) {
      pushNext(PIX_SIGNIN_ROUTE, undefined, { lang });
    } else if (profile) {
      if ("statePlan" in profile && !hasAuthPermission(profile?.statePlan)) {
        pushNext(PIX_SIGNUP_ROUTE, undefined, { lang });
      }
    }
  }, [isAuthenticated, profile]);

  if (profile && !("statePlan" in profile)) {
    return (
      <Flex h="100vh" w="100vw" justify="center" align="center">
        <Spinner size="xl" color="brandBlue.100" thickness="5px" />
      </Flex>
    );
  }

  return (
    <PixPhotoProcessorProvider>
      <PixImportPhotos />
    </PixPhotoProcessorProvider>
  );
};

export default WithWaitForAuthentication(PixImportPhotosPage);
