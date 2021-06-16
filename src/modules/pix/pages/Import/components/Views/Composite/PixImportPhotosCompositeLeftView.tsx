import React, { useState } from "react";
import { Text, SimpleGrid, Box, Image, VStack, Heading, Button, Stack } from "@chakra-ui/core";
import { useDrag, useDrop, DragObjectWithType } from "react-dnd";
import {
  usePixPhotoProcessorState,
  usePixPhotoProcessorFunctions,
} from "../../../shared/contexts/PixImportContext";
import { CompositeImage, PhotoProcessorStep } from "../../../shared/types/PhotoProcessorContext";
import useTranslation from "next-translate/useTranslation";
import PixImportDialog from "../../Control/PixImportDialog";

function ListItem({ image }: { image: CompositeImage }) {
  const { unselectCompositeImage } = usePixPhotoProcessorFunctions();
  const [{ isDragging, canDrag }, drag] = useDrag({
    item: { name: "Photo", type: "photo", image },
    options: {
      dropEffect: "copy",
    },
    canDrag: image.status === "UNSELECTED",
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      canDrag: monitor.canDrag(),
    }),
  });

  const opacity = isDragging ? 0.4 : 1;

  return (
    <>
      <Box
        ref={drag}
        opacity={opacity}
        justify="center"
        align="center"
        w="150px"
        h="100%"
        borderRadius="8px"
        cursor={
          !canDrag ? "url(/svg/cursorLittlePointer.svg), auto" : isDragging ? "grabbing" : "grab"
        }
      >
        {image.status === "SELECTED" && (
          <Image
            src="/svg/compositeImgSelected.svg"
            position="absolute"
            marginLeft="130px"
            marginTop="5px"
          />
        )}
        <Image
          objectFit="cover"
          w="100%"
          src={image.src}
          crossOrigin="anonymous"
          onClick={() => {
            if (image.status === "SELECTED") {
              unselectCompositeImage(image.id);
            }
          }}
        />
      </Box>
    </>
  );
}

export interface DragItem extends DragObjectWithType {
  image: CompositeImage;
}

const PixImportPhotosCompositeLeftView = () => {
  const { t } = useTranslation();
  const { compositeState, jobState } = usePixPhotoProcessorState();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { unselectCompositeImage, goToPreviousStep } = usePixPhotoProcessorFunctions();

  const { imageList, readOnly } = compositeState;

  const [{ canDrop, isOver }, dropTargetRef] = useDrop({
    accept: "photo",
    drop: (item: DragItem) => {
      unselectCompositeImage(item.image.id);
      return { success: true };
    },
    canDrop: (item) => !readOnly && item.image.status === "SELECTED",
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const isActive = canDrop && isOver;

  const onCloseDialog = () => {
    setIsDialogOpen(false);
  };
  const onConfirmDialog = () => {
    onCloseDialog();
    goToPreviousStep(PhotoProcessorStep.WAITING_FOR_FILES);
  };

  return (
    <>
      <VStack
        paddingY="50px"
        spacing="32px"
        w="520px"
        boxShadow="inset -1px 0px 0px rgba(0, 0, 0, 0.25)"
        bg="brandBlue.100"
        color="white"
      >
        <Stack spacing="11px" textAlign="center">
          <Heading fontWeight="bold" fontSize="24px" lineHeight="36px">
            {t("pixImport:photoManager")}
          </Heading>

          <Button
            background="#FFFFFF"
            borderRadius="25px"
            color="brandBlue.100"
            padding="11px 25px"
            onClick={() => {
              if (!jobState.downloadCounter) {
                setIsDialogOpen(true);
              } else {
                goToPreviousStep(PhotoProcessorStep.WAITING_FOR_FILES);
              }
            }}
          >
            {t("pixImport:importMore")}
          </Button>
        </Stack>

        <VStack spacing="15px" justify="flex-start" align="flex-start">
          <Text fontWeight="bold" fontSize="14px" lineHeight="17px">
            {t("pixImport:included")}
          </Text>

          <SimpleGrid w="315px" columns={2} spacing="15px" ref={dropTargetRef}>
            {isActive && (
              <Box
                justify="center"
                align="center"
                width="149px"
                height="94px"
                border="1px solid #DEDEDE"
                borderRadius="8px"
                _hover={{
                  background: "#F6F6F6",
                  border: "1px solid #DEDEDE",
                  fontWeight: "bold",
                }}
              />
            )}
            {imageList
              .filter((image) => image.status === "SELECTED")
              .map((image) => (
                <ListItem image={image} key={image.id} />
              ))}
          </SimpleGrid>
          <Text fontWeight="bold" fontSize="14px" lineHeight="17px">
            {t("pixImport:extraPhotoTitle")}
          </Text>

          <SimpleGrid w="315px" columns={2} spacing="15px" ref={dropTargetRef}>
            {isActive && (
              <Box
                justify="center"
                align="center"
                width="149px"
                height="94px"
                border="1px solid #DEDEDE"
                borderRadius="8px"
                _hover={{
                  background: "#F6F6F6",
                  border: "1px solid #DEDEDE",
                  fontWeight: "bold",
                }}
              />
            )}
            {imageList
              .filter((image) => image.status !== "SELECTED")
              .map((image) => (
                <ListItem image={image} key={image.id} />
              ))}
          </SimpleGrid>
        </VStack>
      </VStack>
      <PixImportDialog isOpen={isDialogOpen} onClose={onCloseDialog} onConfirm={onConfirmDialog} />
    </>
  );
};

export default PixImportPhotosCompositeLeftView;
