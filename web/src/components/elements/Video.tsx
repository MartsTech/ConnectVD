import { ForwardedRef, forwardRef, RefObject, useEffect, useRef } from "react";

interface VideoProps {
  peer?: RTCPeerConnection;
  userVideoRef?: RefObject<HTMLVideoElement>;
}

const Video: React.FC<VideoProps> = forwardRef(
  ({ peer, userVideoRef }, ref: ForwardedRef<HTMLDivElement>) => {
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
      <div ref={ref} className="flex items-center justify-center">
        <video
          className="border"
          autoPlay
          ref={userVideoRef || videoRef}
          muted={typeof userVideoRef !== "undefined"}
          height={600}
          width={600}
        />
      </div>
    );
  }
);

export default Video;
