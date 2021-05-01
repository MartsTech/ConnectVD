import { useEffect, useRef } from "react";

interface VideoProps {}

const Video: React.FC<VideoProps> = ({ peer }) => {
  const videoRef = useRef();

  useEffect(() => {
    peer.ontrack = handleTrackEvent;
  }, []);

  const handleTrackEvent = (e) => {
    videoRef.current.srcObject = e.streams[0];
  };

  return <video autoPlay ref={videoRef} />;
};

export default Video;
