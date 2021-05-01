import { useEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";
import Video from "@module/Video";
import { useRouter } from "next/router";

interface RoomProps {}

const Room: React.FC<RoomProps> = () => {
  const [peers, setPeers] = useState([]);

  const socketRef = useRef<Socket>();
  const userVideoRef = useRef<HTMLVideoElement>();
  const userStream = useRef<MediaStream>();
  const peersRef = useRef([]);

  const router = useRouter();

  const roomId = router.query.id as string;

  useEffect(() => {
    const main = async () => {
      socketRef.current = io("http://localhost:8000");

      const stream = await getUserStream();

      userStream.current = stream;

      if (userVideoRef.current) {
        userVideoRef.current.srcObject = stream;
      }

      socketRef.current.emit("join room", roomId);

      socketRef.current.on("other users", (users) => {
        callUsers(users);
      });

      socketRef.current.on("user left", (id) => {
        removeUser(id);
      });

      socketRef.current.on("offer", handleOffer);
      socketRef.current.on("answer", handleAnswer);
      socketRef.current.on("ice-candidate", handleNewICECandidateMsg);
    };

    main();
  }, []);

  const getUserStream = async () => {
    const devices = await navigator.mediaDevices.enumerateDevices();

    const stream = await navigator.mediaDevices.getUserMedia({
      video: devices.some((device) => device.kind === "videoinput"),
      audio: devices.some((device) => device.kind === "audioinput"),
    });

    return stream;
  };

  const callUsers = (users) => {
    const peers = [];

    users.forEach((id) => {
      const peer = createPeer(id);

      peersRef.current.push({ peerID: id, peer });
      peers.push({ peerID: id, peer });

      setTracks(id);
    });

    setPeers(peers);
  };

  const removeUser = (id) => {
    const peers = peersRef.current.filter((peer) => peer.peerID !== id);

    peersRef.current = peers;
    setPeers(peers);
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

    const offer = peerObj.peer
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
      .catch((err) => console.log(err));
  };

  const handleOffer = (incoming) => {
    const peer = createPeer();
    peersRef.current.push({ peerID: incoming.caller, peer });
    const peerObj = peersRef.current.find(
      (peer) => peer.peerID === incoming.caller
    );
    setPeers((peers) => [...peers, peerObj]);
    const desc = new RTCSessionDescription(incoming.sdp);
    peerObj.peer
      .setRemoteDescription(desc)
      .then(() => {
        userStream.current
          .getTracks()
          .forEach((track) => peerObj.peer.addTrack(track, userStream.current));
      })
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
      });
  };

  const handleAnswer = (message) => {
    const peerObj = peersRef.current.find(
      (peer) => peer.peerID === message.caller
    );
    const desc = new RTCSessionDescription(message.sdp);
    peerObj.peer.setRemoteDescription(desc).catch((err) => console.log(err));
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
    peerObj.peer.addIceCandidate(candidate).catch((err) => console.log(err));
  };

  return (
    <div className="room">
      <div className="">
        <h1>{0}</h1>
        <video id="video" ref={userVideo} autoPlay playsInline muted />
      </div>

      {peers.map((peerObj, id) => {
        return (
          <div>
            <h1>{id + 1}</h1>
            <Video key={peerObj.peerID} peer={peerObj.peer} />
          </div>
        );
      })}
    </div>
  );
};

export default Room;
