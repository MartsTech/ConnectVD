import { useRef, useEffect } from "react";

interface videoProps {
  peer: RTCPeerConnection;
}

export const Video: React.FC<videoProps> = ({ peer }) => {
  const videoRef = useRef<any>();

  useEffect(() => {
    peer.ontrack = handleTrackEvent;
  }, []);

  const handleTrackEvent = (e: RTCTrackEvent) => {
    videoRef.current.srcObject = e.streams[0];
  };

  return <video autoPlay playsInline ref={videoRef} />;
};
