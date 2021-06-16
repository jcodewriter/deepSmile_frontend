import ReactPlayer from "react-player";
import { Wrap, Flex, Box, Spacer, Grid, Icon } from "@chakra-ui/core";
import { useState } from "react";

// icons video player
import { GoUnmute as VolumeUnmuteIcon, GoMute as VolumeMuteIcon } from "react-icons/go";
import { AiOutlinePlayCircle as PlayIcon, AiOutlinePauseCircle as PauseIcon } from "react-icons/ai";

interface SharedVideoPlayerProps {
  src: string;
  type: string;
  autoplay: boolean;
  muted: boolean;
  loop: boolean;
  width: string;
}

interface ControlerVideoPlayerProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  isLoading: boolean;
  isMuted: boolean;
  isPlaying: boolean;
  onClickPlay: (d: boolean) => void;
  onClickMute: (d: boolean) => void;
}

const ControlVideoPlayer = (props: ControlerVideoPlayerProps) => {
  const [isPlaying, setPlaying] = useState<boolean>(props.isPlaying);
  const [isMuted, setMuted] = useState<boolean>(props.isMuted);
  const [isPlayButtonShown, setIsPlayButtonShown] = useState<boolean>(!props.isPlaying);

  const handleClickMute = () => {
    setMuted(!isMuted);
    props.onClickMute(!isMuted);
  };

  const handleClickPlay = () => {
    setPlaying(!isPlaying);
    props.onClickPlay(!isPlaying);
    setIsPlayButtonShown(isPlaying);
  };

  const handleOnMouseEnter = () => {
    setIsPlayButtonShown(true);
  };

  const handleOnMouseLeave = () => {
    setIsPlayButtonShown(isPlaying ? false : true);
  };

  return (
    <Grid
      templateRows="repeat(3, 1fr)"
      templateColumns="repeat(3, 1fr)"
      gap={1}
      height="100%"
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
    >
      <Box w="100%" h="100%" bg="" />
      <Box w="100%" h="100%" bg="" />
      <Box w="100%" h="100%" bg="">
        <Flex>
          <Spacer />
          {isMuted ? (
            <Icon
              cursor="pointer"
              onClick={handleClickMute}
              w={5}
              h={5}
              mt={2}
              mr={2}
              color="gray.300"
              as={VolumeMuteIcon}
            />
          ) : (
            <Icon
              cursor="pointer"
              onClick={handleClickMute}
              w={5}
              h={5}
              mt={2}
              mr={2}
              color="gray.300"
              as={VolumeUnmuteIcon}
            />
          )}
        </Flex>
      </Box>

      <Box w="100%" h="100%" bg="" />
      <Box w="100%" h="100%" bg="" onClick={handleClickPlay}>
        <Flex align="center" justify="center" height="100%">
          {isPlayButtonShown &&
            (isPlaying ? (
              <Icon cursor="pointer" w={10} h={10} color="gray.300" as={PauseIcon} />
            ) : (
              <Icon cursor="pointer" w={10} h={10} color="gray.300" as={PlayIcon} />
            ))}
        </Flex>
      </Box>
      <Box w="100%" h="100%" bg="" />

      <Box w="100%" h="100%" bg="" />
      <Box w="100%" h="100%" bg="" />
      <Box w="100%" h="100%" bg="" />
    </Grid>
  );
};

const SharedVideoPlayer = ({
  src,
  type,
  autoplay = false,
  muted = true,
  loop = true,
  width,
}: SharedVideoPlayerProps) => {
  const [isPlaying, setPlaying] = useState<boolean>(autoplay);
  const [isMuted, setMuted] = useState<boolean>(muted);
  const [isLoading] = useState<boolean>(false);

  const handleClickPlay = (d: boolean) => {
    setPlaying(d);
  };

  const handleClickMute = (d: boolean) => {
    setMuted(d);
  };

  return (
    <Wrap
      maxW={width}
      m="auto"
      borderRadius={{ base: "none", md: "10px", lg: "10px" }}
      overflow="hidden"
    >
      <div
        style={{
          position: "relative",
        }}
      >
        <div
          style={{
            position: "relative",
          }}
        >
          <ReactPlayer
            playing={isPlaying}
            muted={isMuted}
            loop={loop}
            url={[{ src, type }]}
            width="100%"
            height="100%"
            css={`
                            "position": "absolute";
                            "top": "0";
                            "left": "0";
                        `}
          />
        </div>
        <div
          style={{
            position: "absolute",
            left: "0",
            right: "0",
            top: "0",
            bottom: "0",
          }}
        >
          <ControlVideoPlayer
            isLoading={isLoading}
            isMuted={isMuted}
            isPlaying={isPlaying}
            onClickPlay={handleClickPlay}
            onClickMute={handleClickMute}
          />
        </div>
      </div>
    </Wrap>
  );
};
export default SharedVideoPlayer;
