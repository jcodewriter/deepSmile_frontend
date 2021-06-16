import React, { useEffect, useContext } from "react";
import PixFunnel from "src/modules/pix/pages/Funnel";
import { PixFunnelProvider } from "src/modules/pix/shared/contexts/PixFunnelContext";
import { PIX_SIGNIN_ROUTE, PIX_SIGNUP_ROUTE, pushNext } from "src/utils/constants/routes";
import useTranslation from "next-translate/useTranslation";
import hasAuthPermission from "src/modules/pix/shared/utils/hasAuthPermission";
import WithWaitForAuthentication from "src/shared/hocs/WithWaitForAuthentication";
import { useAuthState } from "src/shared/contexts/AuthContext";
import { Flex, Spinner } from "@chakra-ui/core";
import { SmoothScrollContext } from "src/shared/contexts/SmoothScrollContext";

const PixFunnelPage = () => {
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
    <PixFunnelProvider>
      <PixFunnel />
    </PixFunnelProvider>
  );
};

export default WithWaitForAuthentication(PixFunnelPage);
