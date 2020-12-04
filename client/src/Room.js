import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const Room = (props) => {
  const [stream, setStream] = useState();

  const socketRef = useRef("");
  const userVideo = useRef("");

  const roomID = props.match.params.roomID;

  useEffect(() => {
    socketRef.current = io.connect("/");
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        if (userVideo.current) {
          userVideo.current.srcObject = stream;
        }
      });

    socketRef.current.emit("join room", roomID);
  }, []);

  return (
    <div>
      <video ref={userVideo} autoPlay muted />
    </div>
  );
};

export default Room;
