import React, { MouseEvent } from "react";
import { Box, Flex } from "@chakra-ui/core";

const EditorTableCell = () => {
  return <Box as="td" width="33.3333%" border="1px solid #fff" userSelect="none" />;
};

const EditorTableRow = () => {
  return (
    <Box as="tr">
      {Array.from({ length: 3 }, (_, k) => (
        <EditorTableCell key={k} />
      ))}
    </Box>
  );
};

const EditorTable = ({
  frame,
  isActive,
  handleMoveStart,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  frame: { [x: string]: any };
  isActive: boolean;
  handleMoveStart: (event: MouseEvent) => void;
}) => {
  return (
    <Flex
      position="relative"
      border="1px solid white"
      h={frame.height}
      cursor={isActive ? "move" : "default"}
      onMouseDown={handleMoveStart}
    >
      <table
        style={{
          width: "100%",
          height: "100%",
          border: "1px solid #2b303f",
          borderCollapse: "collapse",
          zIndex: -1,
        }}
      >
        {Array.from({ length: 3 }, (_, k) => (
          <EditorTableRow key={k} />
        ))}
      </table>
    </Flex>
  );
};

export default EditorTable;
