import React from "react";
import { Modal, ModalOverlay, ModalContent, ModalCloseButton } from "@chakra-ui/core";

interface PixInvoicesModalFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const PixInvoicesModalForm = ({ isOpen, onClose }: PixInvoicesModalFormProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay>
        <ModalCloseButton bg="white" />
        <ModalContent h="779px" w="640px" />
      </ModalOverlay>
    </Modal>
  );
};

export default PixInvoicesModalForm;
