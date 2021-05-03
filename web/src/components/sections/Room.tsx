import { peerContext } from "@type/peerContext";
import { socketPayload } from "@type/socketPayload";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import Video from "@element/Video";
import FlipMove from "react-flip-move";
import iceConfiguration from "@config/iceConfigs";

interface RoomProps {
  leave: boolean;
}

const Room: React.FC<RoomProps> = ({ leave }) => {
  const [peers, setPeers] = useState<peerContext[]>([]);
  const peersRef = useRef<peerContext[]>([]);
  const senders = useRef<{ id: string; track: RTCRtpSender }[]>([]);

  const socketRef = useRef<Socket>();
  const userStream = useRef<MediaStream>();
  const userVideoRef = useRef<HTMLVideoElement>(null);

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

  useEffect(() => {
    if (leave) {
      leaveRoom();
    }
  }, [leave]);

  const getUserStream = async () => {
    const devices = await navigator.mediaDevices.enumerateDevices();

    const stream = await navigator.mediaDevices.getUserMedia({
      video: devices.some((device) => device.kind === "videoinput"),
      audio: devices.some((device) => device.kind === "audioinput"),
    });

    return stream;
  };

  const callUsers = (users: any) => {
    const peers: peerContext[] = [];

    users.forEach((id: string) => {
      const peer = createPeer(id);

      peersRef.current.push({ peerId: id, peer });
      peers.push({ peerId: id, peer });

      setTracks(id);
    });

    setPeers(peers);
  };

  const createPeer = (id?: string) => {
    const peer = new RTCPeerConnection(iceConfiguration);

    if (typeof id !== "undefined") {
      peer.onnegotiationneeded = () => handleNegotiationNeededEvent(id);
      peer.onicecandidate = (e) => handleICECandidateEvent(e, id);
    }

    return peer;
  };

  const removeUser = (id: string) => {
    const peers = peersRef.current.filter((peer) => peer.peerId !== id);

    peersRef.current = peers;
    setPeers(peers);

    const tempSenders = senders.current.filter((sender) => sender.id !== id);
    senders.current = tempSenders;
  };

  const setTracks = (id: string) => {
    const peerObj = peersRef.current.find((peer) => peer.peerId === id);
    if (typeof peerObj === "undefined") {
      return;
    }

    userStream.current?.getTracks().forEach((track) =>
      senders.current.push({
        id,
        track: peerObj.peer.addTrack(track, userStream.current as MediaStream),
      })
    );
  };

  const leaveRoom = () => {
    socketRef.current?.disconnect();
    userStream.current?.getTracks().forEach((track) => {
      track.stop();
    });
    router.replace("/dash");
  };

  const handleNegotiationNeededEvent = (id: string) => {
    const peerObj = peersRef.current.find((peer) => peer.peerId === id);
    if (typeof peerObj === "undefined") {
      return;
    }

    peerObj.peer
      .createOffer()
      .then((offer) => {
        return peerObj.peer.setLocalDescription(offer);
      })
      .then(() => {
        if (typeof socketRef.current === "undefined") {
          return;
        }

        const payload = {
          target: id,
          caller: socketRef.current.id,
          sdp: peerObj.peer.localDescription,
        };
        socketRef.current.emit("offer", payload);
      })
      .catch((err) => console.error(err));
  };

  const handleOffer = (incoming: socketPayload) => {
    const peerObj = peersRef.current.find(
      (peer) => peer.peerId === incoming.caller
    );
    if (typeof peerObj === "undefined") {
      return;
    }

    const peer = createPeer();

    peersRef.current.push({ peerId: incoming.caller, peer });
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
        if (typeof socketRef.current === "undefined") {
          return;
        }

        const payload = {
          target: incoming.caller,
          caller: socketRef.current.id,
          sdp: peerObj.peer.localDescription,
        };

        socketRef.current.emit("answer", payload);
      })
      .catch((err) => console.error(err));
  };

  const handleAnswer = (message: socketPayload) => {
    const peerObj = peersRef.current.find(
      (peer) => peer.peerId === message.caller
    );
    if (typeof peerObj === "undefined") {
      return;
    }

    const desc = new RTCSessionDescription(message.sdp);
    peerObj.peer.setRemoteDescription(desc).catch((err) => console.error(err));
  };

  const handleICECandidateEvent = (
    e: RTCPeerConnectionIceEvent,
    id: string
  ) => {
    if (!e.candidate || typeof socketRef.current === "undefined") {
      return;
    }

    const payload = {
      target: id,
      caller: socketRef.current.id,
      candidate: e.candidate,
    };

    socketRef.current.emit("ice-candidate", payload);
  };

  const handleNewICECandidateMsg = (payload: socketPayload) => {
    const candidate = new RTCIceCandidate(payload.candidate);

    const peerObj = peersRef.current.find(
      (peer) => peer.peerId === payload.caller
    );
    if (typeof peerObj === "undefined") {
      return;
    }

    peerObj.peer.addIceCandidate(candidate).catch((err) => console.error(err));
  };

  // const peers: peerContext[] = [];
  // for (let i = 0; i < 20; ++i) {
  //   peers.push({
  //     peerID: `${i}`,
  //     peer: new RTCPeerConnection(),
  //   });
  // }

  return (
    <FlipMove
      className="h-full w-full grid sm:grid-cols-1 md:grid-cols-2 items-center
    overflow-y-scroll scrollbar-hide"
    >
      <Video userVideoRef={userVideoRef} />
      {peers.map((peerObj) => {
        return <Video key={peerObj.peerId} peer={peerObj.peer} />;
      })}
    </FlipMove>
  );
};

export default Room;
