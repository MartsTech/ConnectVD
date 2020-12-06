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
      .getUserMedia({ video: video, audio: sound })
      .then((stream) => {
        if (userVideo.current) {
          userVideo.current.srcObject = stream;
        }
        socketRef.current.emit("join room", roomID);
        socketRef.current.on("all users", (users) => {
          const peers = [];
          users.forEach((id) => {
            const peer = createPeer(id, socketRef.current.id, stream);
            peersRef.current.push({
              peerID: id,
              peer,
            });
            peers.push(peer);
          });
          setPeers(peers);
        });

        socketRef.current.on("user joined", (payload) => {
          const peer = addPeer(payload.signal, payload.caller, stream);
          peersRef.current.push({
            peerID: payload.caller,
            peer,
          });

          setPeers((users) => [...users, peer]);
        });

        socketRef.current.on("user left", (id) => {
          peersRef.current.pop(id);
          peers.pop(id);
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
      {peers.map((peer, index) => {
        return <Video key={index} peer={peer} />;
      })}
    </div>
  );
};

export default Room;
