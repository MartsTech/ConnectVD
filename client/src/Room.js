import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { selectLeave, setLeave } from "./features/controlsSlice";
import Video from "./Video";

const Room = (props) => {
  const [peers, setPeers] = useState([]);

  const peersRef = useRef([]);
  const socketRef = useRef();
  const userStream = useRef();
  const userVideo = useRef();

  const dispatch = useDispatch();

  const leave = useSelector(selectLeave);

  const roomID = props.match.params.roomID;

  const mediaConstraints = {
    audio: true,
    video: { height: window.innerHeight / 2.5, width: window.innerWidth / 2.5 },
  };

  const iceConfiguration = {
    iceServers: [
      {
        urls: "stun:stun.stunprotocol.org",
      },
      {
        urls: "turn:numb.viagenie.ca",
        credential: "muazkh",
        username: "webrtc@live.com",
      },
    ],
  };

  useEffect(() => {
    getUserStream(mediaConstraints);
    socketRef.current = io.connect("/");
    socketRef.current.emit("join room", roomID);

    socketRef.current.on("other users", (users) => {
      const peers = [];
      users.forEach((id) => {
        const peer = createPeer(id);
        peersRef.current.push({ peerID: id, peer });
        peers.push({ peerID: id, peer });
        setTracks(id);
      });
      setPeers(peers);
    });

    socketRef.current.on("user left", (id) => {
      const peers = peersRef.current.filter((peer) => peer.peerID !== id);
      peersRef.current = peers;
      setPeers(peers);
    });

    socketRef.current.on("offer", handleOffer);
    socketRef.current.on("answer", handleAnswer);
    socketRef.current.on("ice-candidate", handleNewICECandidateMsg);
  }, []);

  useEffect(() => {
    if (leave) {
      socketRef.current.disconnect();
      userStream.current.getTracks().forEach((track) => {
        track.stop();
      });
      dispatch(setLeave({ leave: false }));
    }
  }, [leave]);

  const getUserStream = (constraints) => {
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        userStream.current = stream;
        userVideo.current.srcObject = stream;
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const createPeer = (userID) => {
    const peer = new RTCPeerConnection(iceConfiguration);

    peer.onnegotiationneeded = () => handleNegotiationNeededEvent(userID);
    peer.onicecandidate = (e) => handleICECandidateEvent(e, userID);

    return peer;
  };

  const setTracks = (userID) => {
    const peerObj = peersRef.current.find((peer) => peer.peerID === userID);
    if (peerObj) {
      userStream.current
        .getTracks()
        .forEach((track) => peerObj.peer.addTrack(track, userStream.current));
    }
  };

  const handleNegotiationNeededEvent = (userID) => {
    const peerObj = peersRef.current.find((peer) => peer.peerID === userID);
    peerObj.peer
      .createOffer()
      .then((offer) => {
        return peerObj.peer.setLocalDescription(offer);
      })
      .then(() => {
        const payload = {
          target: userID,
          caller: socketRef.current.id,
          sdp: peerObj.peer.localDescription,
        };
        socketRef.current.emit("offer", payload);
      })
      .catch((err) => console.error(err));
  };

  const handleOffer = (incoming) => {
    const peer = createPeer();
    peersRef.current.push({ peerID: incoming.caller, peer });
    const peerObj = peersRef.current.find(
      (peer) => peer.peerID === incoming.caller
    );
    setPeers((peers) => [...peers, peerObj]);
    setTracks(incoming.caller);

    const desc = new RTCSessionDescription(incoming.sdp);
    peerObj.peer
      .setRemoteDescription(desc)
      .then(() => {
        return peerObj.peer.createAnswer();
      })
      .then((answer) => {
        return peerObj.peer.setLocalDescription(answer);
      })
      .then(() => {
        const payload = {
          target: incoming.caller,
          caller: socketRef.current.id,
          sdp: peerObj.peer.localDescription,
        };

        socketRef.current.emit("answer", payload);
      })
      .catch((err) => console.error(err));
  };

  const handleAnswer = (message) => {
    const peerObj = peersRef.current.find(
      (peer) => peer.peerID === message.caller
    );
    const desc = new RTCSessionDescription(message.sdp);
    peerObj.peer.setRemoteDescription(desc).catch((err) => console.error(err));
  };

  const handleICECandidateEvent = (e, userID) => {
    if (e.candidate) {
      const payload = {
        target: userID,
        caller: socketRef.current.id,
        candidate: e.candidate,
      };
      socketRef.current.emit("ice-candidate", payload);
    }
  };

  const handleNewICECandidateMsg = (payload) => {
    const candidate = new RTCIceCandidate(payload.candidate);
    const peerObj = peersRef.current.find(
      (peer) => peer.peerID === payload.caller
    );
    peerObj.peer.addIceCandidate(candidate).catch((err) => console.error(err));
  };

  return (
    <div className="meeting__videos">
      <video ref={userVideo} autoPlay playsInline muted />
      {peers.map((peerObj) => {
        return <Video key={peerObj.peerID} peer={peerObj.peer} />;
      })}
    </div>
  );
};

export default Room;
