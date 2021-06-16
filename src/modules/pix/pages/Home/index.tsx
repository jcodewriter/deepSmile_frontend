import React from "react";
import PixSharedSidebarLayout from "src/modules/pix/shared/components/Layouts/PixSharedSidebarLayout";
import { Stack } from "@chakra-ui/core";
import PixHomeBlocksView from "./components/Views/PixHomeBlocksView";
import { useRouter } from "next/router";
import PixInvoices from "../Invoices";
import PixSettingsPhotos from "../SettingsPhotos";
import PixProfile from "../Profile";

const PixHome = () => {
  const router = useRouter();

  const pageQuery = router.query.page || "home";

  if (pageQuery === "home") {
    return (
      <PixSharedSidebarLayout>
        <Stack spacing="72px" h="100%" bg="brandGrey.100">
          <PixHomeBlocksView />
        </Stack>
      </PixSharedSidebarLayout>
    );
  }

  return (
    <>
      {pageQuery === "invoices" && <PixInvoices />}
      {pageQuery === "settingsPhotos" && <PixSettingsPhotos />}
      {pageQuery === "profile" && <PixProfile />}
    </>
  );
};

export default PixHome;
