import React from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/core";
import useTranslation from "next-translate/useTranslation";

const PixImportDialog = ({
  isOpen,
  onClose,
  onConfirm,
  isDirty = false,
}: {
  isOpen: boolean;
  isDirty?: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) => {
  const { t } = useTranslation();
  const cancelRef = React.useRef<HTMLButtonElement | null>(null);

  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {t(`pixImport:${isDirty ? "settingTitle" : "dialogTitle"}`)}
          </AlertDialogHeader>
          <AlertDialogBody>{t("pixImport:dialogQuestion")}</AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              {t("pixImport:dialogCancel")}
            </Button>
            <Button colorScheme="cyan" onClick={onConfirm} ml={3}>
              {t("pixImport:dialogConfirm")}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default PixImportDialog;
