import React from "react";
import { Box } from "@chakra-ui/core";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const EditorCanvas = ({ canvasRef }: { canvasRef: { current: any } }) => {
  return (
    <Box
      position="absolute"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      width="100%"
      height="100%"
      minHeight="100vh"
      overflow="hidden"
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
    </Box>
  );
};

export default EditorCanvas;
