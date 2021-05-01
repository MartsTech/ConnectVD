import { useEffect, useRef } from "react";

interface VideoProps {
  peer: RTCPeerConnection;
}

const Video: React.FC<VideoProps> = ({ peer }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    peer.ontrack = handleTrackEvent;
  }, []);

  const handleTrackEvent = (e: RTCTrackEvent) => {
    if (!videoRef.current) {
      return;
    }
    videoRef.current.srcObject = e.streams[0];
  };

  return <video autoPlay ref={videoRef} />;
};

export default Video;
