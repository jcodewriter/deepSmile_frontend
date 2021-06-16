import React, { useEffect, useRef, useState } from "react";
import { Text, Box, Icon } from "@chakra-ui/core";

function AngleItem({
  isActive,
  angle,
  index,
}: {
  isActive: boolean;
  angle: number;
  index: number;
}) {
  return (
    <Text
      key={index}
      as="span"
      display="block"
      width="50%"
      position="absolute"
      textAlign="right"
      color={isActive ? "#28D4FF" : "#0C404D"}
      transformOrigin="0 0"
      left="50%"
      top="50%"
      fontSize="12px"
      fontWeight="600"
      userSelect="none"
      transform={`rotate(${index}deg)`}
      __css={{
        "> span": {
          marginLeft: 2,
        },
      }}
    >
      {index % 5 === 0 ? angle : null}{" "}
      {index % 5 === 0 ? <span>&#8226;</span> : <span>&#8231;</span>}
    </Text>
  );
}

const MemoizedAngleItem = React.memo(AngleItem);

function RotationWheel({
  value: angle = 0,
  onChange,
  frame,
}: {
  value: number;
  onChange: (newAngle: number) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  frame: { [x: string]: any };
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isMouseDown, setMouseDown] = useState(false);
  const previousMovePoint = useRef<{ screenY: number } | null>(null);

  useEffect(() => {
    function listener(event: WheelEvent) {
      const deltaAngle = Math.sign(event.deltaY);
      onChange(deltaAngle);
    }

    ref.current?.addEventListener("wheel", listener);

    return () => ref.current?.removeEventListener("wheel", listener);
  }, [onChange, angle]);

  useEffect(() => {
    function handleMouseMove(event: MouseEvent) {
      if (!isMouseDown) return;

      let deltaY = event.screenY;
      if (previousMovePoint.current?.screenY) {
        deltaY -= previousMovePoint.current?.screenY;
      }

      if (Math.abs(deltaY) > 7) {
        if (previousMovePoint.current?.screenY) {
          onChange(Math.sign(event.screenY - previousMovePoint.current?.screenY));
          previousMovePoint.current = { screenY: event.screenY };
        }
      }
    }

    document.addEventListener("mousemove", handleMouseMove);

    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, [isMouseDown, onChange]);

  useEffect(() => {
    function handleMoveFinish() {
      if (!isMouseDown) return;

      setMouseDown(false);
      previousMovePoint.current = null;
    }

    document.addEventListener("mouseup", handleMoveFinish);

    return () => document.removeEventListener("mouseup", handleMoveFinish);
  }, [isMouseDown]);

  function getAngleByIndex(index: number) {
    if (index === 0) return 0;

    return 360 - index;
  }

  function handleMoveStart(event: MouseEvent) {
    setMouseDown(true);
    previousMovePoint.current = { screenY: event.screenY };
  }

  return (
    <Box
      position="absolute"
      width="105px"
      left="100%"
      overflow="hidden"
      height="100%"
      zIndex="1"
      cursor={isMouseDown ? "grabbing" : "grab"}
      onMouseDown={handleMoveStart}
    >
      <Box position="absolute" right="15px" w={frame.height} h={frame.height}>
        <Box height="100%" right="-7px" ref={ref} transform={`rotate(${angle}deg)`}>
          {Array.from({ length: 360 }).map((v, index) => (
            <MemoizedAngleItem
              key={getAngleByIndex(index)}
              isActive={getAngleByIndex(index) === angle}
              angle={getAngleByIndex(index)}
              index={index}
            />
          ))}
        </Box>
        <Icon
          position="absolute"
          right="-5px"
          top="50%"
          transform="translate(100%, -50%) translateY(6px) rotate(180deg)"
          display="block"
          width="0"
          height="0"
          borderTop="5px solid transparent"
          borderBottom="5px solid transparent"
          borderLeft="7px solid #28D4FF"
        />
      </Box>
    </Box>
  );
}

export default RotationWheel;
