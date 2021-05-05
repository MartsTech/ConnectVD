import { RefObject, useEffect, useRef } from "react";

interface VideoProps {
  peer?: RTCPeerConnection;
  userVideoRef?: RefObject<HTMLVideoElement>;
}

const Video: React.FC<VideoProps> = ({ peer, userVideoRef }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (peer) {
      peer.ontrack = handleTrackEvent;
    }
  }, [peer]);

  const handleTrackEvent = (e: RTCTrackEvent) => {
    if (videoRef.current) {
      videoRef.current.srcObject = e.streams[0];
    }
  };

  return (
    <video
      className="bg-opacity-0"
      autoPlay
      ref={userVideoRef || videoRef}
      muted={typeof userVideoRef !== "undefined"}
      height={600}
      width={600}
    />
  );
};

export default Video;
