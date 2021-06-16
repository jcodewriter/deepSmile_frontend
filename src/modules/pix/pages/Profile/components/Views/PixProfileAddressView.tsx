import React, { ReactElement } from "react";
import {
  VStack,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  useDisclosure,
  Text,
} from "@chakra-ui/core";
import useTranslation from "next-translate/useTranslation";
import { useAuthState } from "src/shared/contexts/AuthContext";
import { SharedGradientButton } from "src/shared/components/Button/SharedGradientButton";

const PixProfileAddressView = ({ modal }: { modal: ReactElement }) => {
  const { t } = useTranslation();
  const { profile } = useAuthState();
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
      <VStack
        align="flex-start"
        fontFamily="Montserrat"
        fontStyle="normal"
        fontWeight="500"
        fontSize="16px"
        lineHeight="20px"
        color="#222222"
      >
        <Text>{profile?.infos?.address}</Text>
        <Text paddingBottom="24px">
          {profile?.infos?.zipcode} {profile?.infos?.city}
        </Text>
        <SharedGradientButton onClick={onOpen} variant="white">
          {t("profile:profileAddBillingAddressButton")}
        </SharedGradientButton>
      </VStack>
    </Box>
  );
};

export default PixProfileAddressView;
