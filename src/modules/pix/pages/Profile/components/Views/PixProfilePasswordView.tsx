import React, { ReactElement } from "react";
import useTranslation from "next-translate/useTranslation";
import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/core";
import { SharedGradientButton } from "src/shared/components/Button/SharedGradientButton";

const PixProfilePasswordView = ({ modal }: { modal: ReactElement }) => {
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay>
          <ModalContent maxWidth="710px">
            <ModalCloseButton />
            {React.cloneElement(modal, { closeModal: onClose })}
          </ModalContent>
        </ModalOverlay>
      </Modal>
      <Box align="flex-start">
        <SharedGradientButton onClick={onOpen} variant="white">
          {t("profile:profileModifyPasswordButton")}
        </SharedGradientButton>
      </Box>
    </Box>
  );
};

export default PixProfilePasswordView;
