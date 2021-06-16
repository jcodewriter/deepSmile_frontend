import React, { useState, useEffect } from "react";
import { Range, getTrackBackground, Direction } from "react-range";
import { Text, Stack } from "@chakra-ui/core";

interface ScaleRangeProps {
  value: number;
  onChange: (arg0: number) => void;
}

const MIN = 100;
const MAX = 400;
const STEP = 1;

function ScaleRange({ value, onChange }: ScaleRangeProps) {
  const [scaleValue, setScaleValue] = useState([value]);

  useEffect(() => {
    setScaleValue([value]);
  }, [value]);
  return (
    <Stack
      position="absolute"
      top="0"
      bottom="0"
      right="100%"
      marginRight="25px"
      justify="space-around"
      align="center"
      bgColor="white"
      borderRadius="8px"
      w="68px"
      border="2px solid #0C404D"
    >
      <Text
        fontWeight="bold"
        fontSize="12px"
        lineHeight="20px"
        textTransform="uppercase"
        color="rgba(0,0,0,0.5)"
      >
        {MAX}%
      </Text>
      <Range
        step={STEP}
        min={MIN}
        max={MAX}
        direction={Direction.Up}
        onChange={(values) => {
          setScaleValue(values);
          onChange(values[0]);
        }}
        values={scaleValue}
        renderTrack={({ props, children }) => (
          // eslint-disable-next-line jsx-a11y/no-static-element-interactions
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
              height: "465px",
              display: "flex",
              width: "4px",
            }}
          >
            <div
              ref={props.ref}
              style={{
                height: "100%",
                width: "100%",
                borderRadius: "4px",
                background: getTrackBackground({
                  values: scaleValue,
                  direction: Direction.Up,
                  colors: ["#28D4FF", "#AFAFAF"],
                  min: MIN,
                  max: MAX,
                }),
                alignSelf: "center",
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "20px",
              width: "20px",
              borderRadius: "50%",
              backgroundColor: "#FFF",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            }}
          >
            <div
              style={{
                position: "absolute",

                left: "-70px",
                color: "#28D4FF",
                fontWeight: "bold",
                fontSize: "14px",

                padding: "8px",
                borderRadius: "4px",
                backgroundColor: "white",
              }}
            >
              {Math.round(scaleValue[0])}
            </div>
            <div
              style={{
                height: "4px",
                width: "4px",
                backgroundColor: "#28D4FF",
              }}
            />
          </div>
        )}
      />
      <Text
        fontWeight="bold"
        fontSize="12px"
        lineHeight="20px"
        textTransform="uppercase"
        color="rgba(0,0,0,0.5)"
      >
        {MIN}%
      </Text>
    </Stack>
  );
}

export default ScaleRange;
