import SharedVideoPlayer from "src/shared/components/Video/SharedVideoPlayer";

const UdiniProductsVideoView = () => {
  return (
    <SharedVideoPlayer
      width="1280px"
      autoplay={false}
      muted={true}
      loop={true}
      src="/video/pix_video.mp4"
      type="video/mp4"
    />
  );
};

export default UdiniProductsVideoView;
