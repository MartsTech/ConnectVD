import React, { useEffect, useRef } from "react";

const Video = ({ peer }) => {
  const streamRef = useRef();

  useEffect(() => {
    peer.on("stream", (stream) => {
      streamRef.current.srcObject = stream;
    });
  }, []);

  return <video autoPlay ref={streamRef} />;
};

export default Video;
