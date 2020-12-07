import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import Video from "./Video";
import { selectSound, selectVideo } from "./features/controlsSlice";
import { useSelector } from "react-redux";

const videoConstraints = {
  height: window.innerHeight / 2.5,
  width: window.innerWidth / 2.5,
};

const Room = (props) => {
  const [peers, setPeers] = useState([]);

  const peersRef = useRef([]);
  const socketRef = useRef();
  const userVideo = useRef();

  const sound = useSelector(selectSound);
  const video = useSelector(selectVideo);

  const roomID = props.match.params.roomID;

  useEffect(() => {
    socketRef.current = io.connect("/");
    navigator.mediaDevices
      .getUserMedia({ video: videoConstraints, audio: sound })
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
          const peer = addPeer(payload.signal, payload.caller, stream);
          peersRef.current.push({
            peerID: payload.caller,
            peer,
          });

          const peerObj = {
            peerID: payload.caller,
            peer,
          };

          setPeers((users) => [...users, peerObj]);
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
          const item = peersRef.current.find(
            (peer) => peer.peerID === payload.id
          );
          item.peer.signal(payload.signal);
        });
      });
  }, []);

  const createPeer = (userToSignal, caller, stream) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("sending signal", {
        userToSignal,
        caller,
        signal,
      });
    });

    return peer;
  };

  const addPeer = (incomingSignal, caller, stream) => {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("returning signal", { signal, caller });
    });

    peer.signal(incomingSignal);

    return peer;
  };

  return (
    <div className="meeting__videos">
      <video muted ref={userVideo} autoPlay />
      {peers.map((peer) => {
        return <Video key={peer.peerID} peer={peer.peer} />;
      })}
    </div>
  );
};

export default Room;
