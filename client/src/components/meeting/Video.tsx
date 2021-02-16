import { useEffect, useRef } from "react";
import styles from "../../styles/Video.module.css";

interface videoProps {
  peer: RTCPeerConnection;
  state: boolean;
}

export const Video: React.FC<videoProps> = ({ peer }) => {
  const videoRef = useRef<any>();

  useEffect(() => {
    peer.ontrack = handleTrackEvent;
    // eslint-disable-next-line
  }, []);

  const handleTrackEvent = (e: RTCTrackEvent) => {
    videoRef.current.srcObject = e.streams[0];
  };

  return (
    <div className={styles.video}>
      <video autoPlay playsInline ref={videoRef} />
    </div>
  );
};
