import React, { ReactNode, ReactElement } from "react";
import {
  VStack,
  Spacer,
  Flex,
  Box,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
  Text,
  useDisclosure,
} from "@chakra-ui/core";
import { EditIcon } from "@chakra-ui/icons";
import PixProfileIconButton from "src/modules/pix/pages/Profile/components/Controls/PixProfileIconButton";

interface PixProfileBlockProps {
  children: ReactNode;
  title: string;
  hasRightButton?: boolean;
  modal: ReactElement;
}

const PixProfileBlock = ({
  children,
  title,
  hasRightButton = true,
  modal,
}: PixProfileBlockProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay>
          <ModalContent maxWidth="710px">
            <ModalCloseButton mt="28px" />
            {React.cloneElement(modal, { closeModal: onClose })}
          </ModalContent>
        </ModalOverlay>
      </Modal>
      <VStack
        background="white"
        boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)"
        borderRadius="4px"
        align="flex-start"
        w="640px"
        padding="30px"
      >
        <Flex w="100%" marginBottom="24px">
          <Box>
            <Text
              fontWeight="bold"
              fontSize="20px"
              lineHeight="36px"
              fontFamily="Montserrat"
              fontStyle="normal"
            >
              {title}
            </Text>
          </Box>
          <Spacer />
          <Box>
            {hasRightButton && (
              <PixProfileIconButton onClick={onOpen}>
                <EditIcon />
              </PixProfileIconButton>
            )}
          </Box>
        </Flex>
        {children}
      </VStack>
    </Box>
  );
};

export default PixProfileBlock;
