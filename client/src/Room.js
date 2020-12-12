import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import Video from "./Video";
import { selectAudio, selectVideo } from "./features/controlsSlice";
import { useSelector } from "react-redux";

const Room = (props) => {
  const [peers, setPeers] = useState([]);

  const peersRef = useRef([]);
  const socketRef = useRef();
  const userVideo = useRef();

  const audio = useSelector(selectAudio);
  const video = useSelector(selectVideo);

  const roomID = props.match.params.roomID;

  const mediaConstraints = {
    audio: audio,
    video: video
      ? { height: window.innerHeight / 2.5, width: window.innerWidth / 2.5 }
      : video,
  };

  useEffect(() => {
    socketRef.current = io.connect("/");
    navigator.mediaDevices
      .getUserMedia(mediaConstraints)
      .then((stream) => {
        userVideo.current.srcObject = stream;
        socketRef.current.emit("join room", roomID);
        socketRef.current.on("all users", (users) => {
          const peers = [];
          users.forEach((id) => {
            const peer = createPeer(id, socketRef.current.id, stream);
            peersRef.current.push({
              peerID: id,
              peer,
            });
            peers.push({
              peerID: id,
              peer,
            });
          });
          setPeers(peers);
        });

        socketRef.current.on("user joined", (payload) => {
          const peer = addPeer(payload.signal, payload.callerID, stream);
          peersRef.current.push({
            peerID: payload.callerID,
            peer,
          });

          const peerObj = {
            peerID: payload.callerID,
            peer,
          };
          setPeers((peers) => [...peers, peerObj]);
        });

        socketRef.current.on("user left", (id) => {
          const peerObj = peersRef.current.find((peer) => peer.peerID === id);
          if (peerObj) {
            peerObj.peer.destroy();
          }
          const peers = peersRef.current.filter((peer) => peer.peerID !== id);
          peersRef.current = peers;
          setPeers(peers);
        });

        socketRef.current.on("receiving returned signal", (payload) => {
          const peerObj = peersRef.current.find(
            (peer) => peer.peerID === payload.id
          );
          peerObj.peer.signal(payload.signal);
        });
      })
      .catch((err) => {});
  }, []);

  const createPeer = (userToSignal, callerID, stream) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("sending signal", {
        userToSignal,
        callerID,
        signal,
      });
    });

    return peer;
  };

  const addPeer = (incomingSignal, callerID, stream) => {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("returning signal", { signal, callerID });
    });

    peer.signal(incomingSignal);

    return peer;
  };

  return (
    <div className="meeting__videos">
      <video muted ref={userVideo} autoPlay />
      {peers.map((peerObj) => {
        return <Video key={peerObj.peerID} peer={peerObj.peer} />;
      })}
    </div>
  );
};

export default Room;
