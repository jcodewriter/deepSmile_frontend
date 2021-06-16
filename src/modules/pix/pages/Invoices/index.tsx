import React, { useState } from "react";
import PixSharedSidebarLayout from "src/modules/pix/shared/components/Layouts/PixSharedSidebarLayout";
import { Stack } from "@chakra-ui/core";
import PixInvoicesModalForm from "./components/Forms/PixInvoicesModalForm";
import PixInvoicesTitleView from "./components/Views/PixInvoicesTitleView";
import PixInvoicesHistoryView from "./components/Views/PixInvoicesHistoryView";

const PixInvoices = () => {
  const [isModalOpen, setModalVisibility] = useState(false);

  const onCloseModal = () => {
    setModalVisibility(false);
  };

  const onOpenModal = () => {
    setModalVisibility(true);
  };

  return (
    <PixSharedSidebarLayout>
      <Stack padding="50px 80px" h="100%" spacing="38px" bg="brandGrey.100">
        <PixInvoicesTitleView onOpenModal={onOpenModal} />
        <PixInvoicesHistoryView />
      </Stack>
      <PixInvoicesModalForm isOpen={isModalOpen} onClose={onCloseModal} />
    </PixSharedSidebarLayout>
  );
};

export default PixInvoices;
