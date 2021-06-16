import React, { useState, useRef, useEffect, useLayoutEffect, MouseEvent } from "react";
import { Flex, Box } from "@chakra-ui/core";
import { CompositeImage } from "../../shared/types/PhotoProcessorContext";
import { usePixPhotoProcessorState } from "../../shared/contexts/PixImportContext";
import CanvasEditor from "../../shared/utils/CanvasEditor";
import ScaleRange from "../Control/Editor/ScaleRange";
import { Canvas } from "../../shared/utils/CanvasEditor";
import EditorTopView from "../Views/Editor/EditorTopView";
import EditorCanvas from "../Views/Editor/EditorCanvas";
import RotationWheel from "../Control/Editor/RotationWheel";
import EditorTable from "../Views/Editor/EditorTable";

interface IPreviousMovePoint {
  screenX: number;
  screenY: number;
}

const initParams = {
  scale: 1,
  rotate: 0,
  translate: { x: 0, y: 0 },
};

const getFrameParams = (imageAspectRatio: number | undefined) => {
  const { innerWidth, innerHeight } = window;

  const maxWidth = innerWidth - 300;
  const maxHeight = innerHeight - 150;

  const frameAspectRatio = maxHeight / maxWidth;

  const preferWidth = maxWidth > 1000 ? 1000 : maxWidth;
  const preferHeight = maxHeight > 750 ? 750 : maxHeight;

  if (typeof imageAspectRatio === "undefined") {
    return {
      height: preferHeight,
      width: preferWidth,
    };
  }

  if (imageAspectRatio > frameAspectRatio) {
    return {
      height: preferHeight,
      width: preferHeight / imageAspectRatio,
    };
  } else {
    return {
      height: preferWidth * imageAspectRatio,
      width: preferWidth,
    };
  }
};

const PixImportPhotosEditorStep = () => {
  const { compositeState } = usePixPhotoProcessorState();

  const image = compositeState.editingImage as CompositeImage; // Editor step should not be called with editingImage undefined
  const frame = getFrameParams(image.aspectRatio);

  const isMouseDown = useRef(false);
  const previousMovePoint = useRef<IPreviousMovePoint | null>(null);

  const editParams = image.editParams || { scale: 0, rotate: 0, translate: { x: 0, y: 0 } };
  const [scale, setScale] = useState(image.editParams ? editParams.scale : initParams.scale);
  const [rotate, setRotate] = useState(image.editParams ? editParams.rotate : initParams.rotate);
  const [editorImageSrc, setEditorImageSrc] = useState(image.editorSrc);

  const isTranslateDisabled = scale === 1;

  const canvasRef = useRef<Canvas | null>(null);
  const canvasEditor = useRef<CanvasEditor | null>(null);
  /*
  useEffect(() => {
    ScrollHelper.disableScroll();

    return () => ScrollHelper.enableScroll();
  }, []);
*/
  useLayoutEffect(() => {
    const { current: canvas } = canvasRef;
    if (canvas) {
      const editor = new CanvasEditor(canvas, {
        rotate,
        scale,
        translate: editParams.translate || initParams.translate,
      });
      editor.initImage(image.editorSrc, frame);
      canvasEditor.current = editor;
    }
  }, []);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent<Element, MouseEvent>) => {
      if (!isMouseDown.current || isTranslateDisabled) return;

      if (previousMovePoint && previousMovePoint.current !== null) {
        canvasEditor.current?.onTranslate(
          event.screenX - previousMovePoint.current.screenX,
          event.screenY - previousMovePoint.current.screenY
        );
      }
      previousMovePoint.current = { screenX: event.screenX, screenY: event.screenY };
    };

    document.addEventListener("mousemove", () => handleMouseMove);

    return () => document.removeEventListener("mousemove", () => handleMouseMove);
  }, [isTranslateDisabled]);

  useEffect(() => {
    const handleMoveFinish = () => {
      if (isTranslateDisabled) return;

      isMouseDown.current = false;
      previousMovePoint.current = null;
    };

    document.addEventListener("mouseup", handleMoveFinish);

    return () => document.removeEventListener("mouseup", handleMoveFinish);
  }, [isTranslateDisabled]);

  const handleScaleChange = (value: number) => {
    const newScale = value / 100;
    canvasEditor.current?.onScale(newScale);
    const editorParams = canvasEditor.current?.getEditParams();
    if (editorParams && editParams.scale) {
      setScale(editorParams.scale);
    }
  };

  const fixAngle = (value: number) => {
    if (value >= 360) return value - 360;

    if (value < 0) return 360 + value;

    return value;
  };

  const handleRotate = (delta: number) => {
    const newRotate = fixAngle(rotate + delta);
    canvasEditor.current?.onRotate(newRotate);
    const editorParams = canvasEditor.current?.getEditParams();
    if (editorParams) {
      setScale(editorParams.scale);
      setRotate(editorParams.rotate);
    }
  };

  const backToOriginalImage = () => {
    const { current: editor } = canvasEditor;
    setScale(initParams.scale);
    setRotate(initParams.rotate);
    editor?.setTransform(initParams);
    editor?.initImage(image.originalSrc || "", frame);
    setEditorImageSrc(image.originalSrc || "");
  };

  const backToPixImage = () => {
    const { current: editor } = canvasEditor;
    setScale(initParams.scale);
    setRotate(initParams.rotate);
    editor?.setTransform(initParams);
    editor?.initImage(image.processedSrc, frame);
    setEditorImageSrc(image.processedSrc);
  };

  const handleMoveStart = (event: MouseEvent) => {
    if (isTranslateDisabled || isMouseDown.current) return;

    isMouseDown.current = true;
    if (previousMovePoint.current) {
      previousMovePoint.current = { screenX: event.screenX, screenY: event.screenY };
    }
  };

  return (
    <Flex
      position="fixed"
      left="0"
      right="0"
      top="0"
      bottom="0"
      flexDirection="column"
      background="rgb(247, 247, 247)"
      overflowY="auto"
      zIndex="1000"
      userSelect="none"
    >
      <Box position="relative" padding="70px 0" margin="auto 0" maxWidth="100%">
        <Box position="relative" margin="0 auto" zIndex="1" w={frame.width}>
          <EditorTopView
            image={image}
            backToOriginalImage={backToOriginalImage}
            backToPixImage={backToPixImage}
            editorImageSrc={editorImageSrc}
            canvasEditor={canvasEditor}
            handleRotate={handleRotate}
          />

          <RotationWheel
            value={rotate}
            onChange={(newAngle: number) => handleRotate(newAngle)}
            frame={frame}
          />
          <ScaleRange value={scale * 100} onChange={handleScaleChange} />
          <EditorTable
            isActive={!isTranslateDisabled}
            frame={frame}
            handleMoveStart={handleMoveStart}
          />
        </Box>
        <EditorCanvas canvasRef={canvasRef} />
      </Box>
    </Flex>
  );
};

export default PixImportPhotosEditorStep;
