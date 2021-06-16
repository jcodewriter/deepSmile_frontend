import React from "react";
import { Flex, HStack, Button, Image } from "@chakra-ui/core";

import {
  PixPhotoProcessorActionType,
  CompositeImage,
} from "../../../shared/types/PhotoProcessorContext";
import { usePixPhotoProcessorDispatch } from "../../../shared/contexts/PixImportContext";
import { useMutation } from "@apollo/client";
import { UPDATE_IMAGE } from "src/graphql/Mutations/Images";
import useTranslation from "next-translate/useTranslation";
import CommonHelper from "src/utils/helpers/CommonHelper";

import { CustomCanvas } from "src/utils/helpers/CommonHelper";

interface CustomBlob extends Blob {
  name?: string;
}

const EditorTopView = ({
  image,
  canvasEditor,
  editorImageSrc,
  backToOriginalImage,
  backToPixImage,
  handleRotate,
}: {
  image: CompositeImage;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  canvasEditor: { current: any };
  editorImageSrc: string;
  backToOriginalImage: () => void;
  backToPixImage: () => void;
  handleRotate: (delta: number) => void;
}) => {
  const dispatch = usePixPhotoProcessorDispatch();
  const [updateImage] = useMutation(UPDATE_IMAGE);
  const { t } = useTranslation();

  const finishEditing = () => {
    const { current: editor } = canvasEditor;

    if (editor) {
      const { src: newSrc, canvas: editedImageCanvas } = editor.getEditedImageSrc();

      const editorParams = canvasEditor.current?.getEditParams();
      if (editorParams) {
        dispatch({
          type: PixPhotoProcessorActionType.FINISH_EDIT_IMAGE,
          payload: {
            imageId: image.id,
            params: editorParams,
            src: newSrc,
            editorSrc: editorImageSrc,
          },
        });
      }

      CommonHelper.convertCanvasToBlob(editedImageCanvas as CustomCanvas)
        .then((blob) => {
          const imageBlob: CustomBlob = new Blob([blob as BlobPart], { type: "image/jpeg" });
          imageBlob.name = image.id + ".jpg";
          return updateImage({ variables: { newImage: imageBlob, idImage: image?.id } });
        })
        .catch(console.error);
    }
  };

  const cancelEditing = () => {
    dispatch({ type: PixPhotoProcessorActionType.CANCEL_EDIT_IMAGE });
  };

  return (
    <Flex
      justify="space-between"
      align="center"
      bottom="100%"
      left="0"
      width="100%"
      marginBottom="15px"
      position="absolute"
      zIndex="2"
    >
      <HStack spacing="16px">
        <Button
          color="white"
          background="#0C404D"
          borderRadius="25px"
          paddingX="30px"
          height="40px"
          fontWeight="bold"
          fontSize="14px"
          lineHeight="17px"
          onClick={cancelEditing}
          _hover={{}}
        >
          {t("pixEditor:editorCancelButton")}
        </Button>
        <Button
          color="white"
          background="#0C404D"
          borderRadius="25px"
          paddingX="30px"
          height="40px"
          fontWeight="bold"
          fontSize="14px"
          lineHeight="17px"
          onClick={backToOriginalImage}
          _hover={{}}
        >
          {t("pixEditor:editorRevertOriginalText")}
        </Button>
        <Button
          color="white"
          background="#0C404D"
          borderRadius="25px"
          paddingX="30px"
          height="40px"
          fontWeight="bold"
          fontSize="14px"
          lineHeight="17px"
          onClick={backToPixImage}
          _hover={{}}
        >
          {t("pixEditor:editorRevertPixText")}
        </Button>
        <Button
          color="white"
          background="brandBlue.100"
          borderRadius="25px"
          paddingX="30px"
          height="40px"
          fontWeight="bold"
          fontSize="14px"
          lineHeight="17px"
          onClick={finishEditing}
          _hover={{}}
        >
          {t("pixEditor:editorSaveButton")}
        </Button>
      </HStack>
      <HStack spacing="20px" bg="#0C404D" padding="15px">
        <Image cursor="pointer" src="/svg/editor-90.svg" onClick={() => handleRotate(-90)} />
        <Image cursor="pointer" src="/svg/editor-45.svg" onClick={() => handleRotate(-45)} />
        <Image cursor="pointer" src="/svg/editor45.svg" onClick={() => handleRotate(45)} />
        <Image cursor="pointer" src="/svg/editor90.svg" onClick={() => handleRotate(90)} />
      </HStack>
    </Flex>
  );
};

export default EditorTopView;
