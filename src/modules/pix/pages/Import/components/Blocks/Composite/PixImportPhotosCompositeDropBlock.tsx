import React, { useMemo, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { Box, Image, HStack } from "@chakra-ui/core";
import {
  usePixPhotoProcessorDispatch,
  usePixPhotoProcessorState,
  usePixPhotoProcessorFunctions,
} from "../../../shared/contexts/PixImportContext";
import { DragItem } from "../../Views/Composite/PixImportPhotosCompositeLeftView";

import { PixPhotoProcessorActionType } from "../../../shared/types/PhotoProcessorContext";

interface PixImportPhotosCompositeDropBlockProps {
  column: number;
  row: number;
}

const PixImportPhotosCompositeDropBlock = ({
  column,
  row,
}: PixImportPhotosCompositeDropBlockProps) => {
  const { unselectCompositeImage } = usePixPhotoProcessorFunctions();
  const { compositeState } = usePixPhotoProcessorState();
  const [isHover, setHover] = useState(false);
  const dispatch = usePixPhotoProcessorDispatch();
  const { imageList, readOnly } = compositeState;

  const image = useMemo(
    () =>
      imageList.find(
        (image) =>
          image.status === "SELECTED" &&
          image.position?.row === row &&
          image.position?.column === column
      ),
    [row, column, imageList]
  );

  const [{ canDrop, isOver }, dropTargetRef] = useDrop({
    accept: "photo",
    drop: (item: DragItem) => {
      if (!image) {
        dispatch({
          type: PixPhotoProcessorActionType.SELECT_COMPOSITE_IMAGE,
          payload: { imageId: item.image.id, position: { row, column } },
        });
      } else {
        dispatch({
          type: PixPhotoProcessorActionType.REPLACE_COMPOSITE_IMAGE,
          payload: { oldImageId: image.id, newImageId: item.image.id },
        });
      }
      return { success: true };
    },
    canDrop: (dragItem) => !image || (image && dragItem.image.id !== image.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });

  const [{ isDragging }, dragTargetRef] = useDrag({
    item: { name: "Photo", type: "photo", image },
    options: {
      dropEffect: "copy",
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: !readOnly,
  });

  const isActive = canDrop && isOver;
  const opacity = isDragging ? 0.4 : 1;

  return (
    <Box
      h="215.75px"
      bg="white"
      width="287px"
      borderRadius="5px"
      boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)"
      cursor={isDragging ? "grabbing" : "url(/svg/cursorLittlePointer.svg), auto"}
      opacity={opacity}
      _hover={
        image
          ? {
              background: "#28D4FF",
              border: "1px solid #DEDEDE",
              fontWeight: "bold",
              boxShadow: isActive ? "box-shadow: 0 0 0 1.5px #4575e1" : "",
            }
          : {}
      }
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
      ref={dropTargetRef}
    >
      {image && isHover ? (
        <HStack
          h="100%"
          padding="18px 15px"
          justify="space-between"
          align="flex-start"
          ref={dragTargetRef}
        >
          <Image
            boxSize="15px"
            src="/img/trash.png"
            onClick={() => unselectCompositeImage(image.id)}
          />
          <Image
            boxSize="15px"
            src="/img/pen.png"
            onClick={() => {
              dispatch({ type: PixPhotoProcessorActionType.START_EDIT_IMAGE, imageId: image.id });
            }}
          />
        </HStack>
      ) : image ? (
        <Box h="100%" ref={dragTargetRef}>
          <Image
            height="100%"
            width="100%"
            objectFit="cover"
            src={image.src}
            crossOrigin="anonymous"
          />
        </Box>
      ) : (
        <Box h="100%" />
      )}
    </Box>
  );
};

export default PixImportPhotosCompositeDropBlock;
