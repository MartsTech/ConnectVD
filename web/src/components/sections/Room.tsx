import { iceConfiguration } from "@config/iceConfigs";
import Video from "@element/Video";
import { peerContext } from "@type/peerContext";
import { socketPayload } from "@type/socketPayload";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import FlipMove from "react-flip-move";
import { io, Socket } from "socket.io-client";

interface RoomProps {
  leave: boolean;
}

const Room: React.FC<RoomProps> = ({ leave }) => {
  const [peers, setPeers] = useState<peerContext[]>([]);
  const peersRef = useRef<peerContext[]>([]);

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

      socketRef.current.on("other users", (users: string[]) => {
        callUsers(users);
      });

      socketRef.current.on("user left", (id: string) => {
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

  const leaveRoom = () => {
    socketRef.current?.disconnect();
    userStream.current?.getTracks().forEach((track) => {
      track.stop();
    });
    router.replace("/dash");
  };

  const removeUser = (id: string) => {
    const peers = peersRef.current.filter((peer) => peer.peerId !== id);

    peersRef.current = peers;
    setPeers(peers);
  };

  const callUsers = (users: string[]) => {
    const peers: peerContext[] = [];

    users.forEach((id) => {
      const peer = createPeer(id);

      peersRef.current.push({ peerId: id, peer });
      peers.push({ peerId: id, peer });

      setTracks(id);
    });

    setPeers(peers);
  };

  const acceptCall = (id: string) => {
    const peer = createPeer();
    const peerObj: peerContext = { peerId: id, peer };

    peersRef.current.push({ peerId: id, peer });
    setPeers((peers) => [...peers, peerObj]);
    setTracks(id);

    return peerObj;
  };

  const createPeer = (id?: string) => {
    const peer = new RTCPeerConnection(iceConfiguration);

    if (id) {
      peer.onnegotiationneeded = () => handleNegotiationNeededEvent(id);
      peer.onicecandidate = (e) => handleICECandidateEvent(e, id);
    }

    return peer;
  };

  const setTracks = (id: string) => {
    const peerObj = peersRef.current.find((peer) => peer.peerId === id);
    if (!peerObj) {
      return;
    }

    userStream.current
      ?.getTracks()
      .forEach((track) =>
        peerObj.peer.addTrack(track, userStream.current as MediaStream)
      );
  };

  const handleNegotiationNeededEvent = (id: string) => {
    const peerObj = peersRef.current.find((peer) => peer.peerId === id);
    if (!peerObj) {
      return;
    }

    peerObj.peer
      .createOffer()
      .then((offer) => {
        return peerObj.peer.setLocalDescription(offer);
      })
      .then(() => {
        if (!socketRef.current) {
          return;
        }

        const payload: socketPayload = {
          target: id,
          caller: socketRef.current.id,
          sdp: peerObj.peer.localDescription as RTCSessionDescription,
        };
        socketRef.current.emit("offer", payload);
      })
      .catch((err) => console.error(err));
  };

  const handleOffer = (incoming: socketPayload) => {
    const peerObj = acceptCall(incoming.caller);

    const desc = new RTCSessionDescription(incoming.sdp);
    peerObj.peer
      .setRemoteDescription(desc)
      .then(() => {
        return peerObj.peer.createAnswer();
      })
      .then((answer: any) => {
        return peerObj.peer.setLocalDescription(answer);
      })
      .then(() => {
        if (!socketRef.current) {
          return;
        }

        const payload: socketPayload = {
          target: incoming.caller,
          caller: socketRef.current.id,
          sdp: peerObj.peer.localDescription as RTCSessionDescription,
        };

        socketRef.current.emit("answer", payload);
      })
      .catch((err) => console.error(err));
  };

  const handleAnswer = (message: socketPayload) => {
    const peerObj = peersRef.current.find(
      (peer) => peer.peerId === message.caller
    );
    if (!peerObj) {
      return;
    }

    const desc = new RTCSessionDescription(message.sdp);
    peerObj.peer
      .setRemoteDescription(desc)
      .catch((err: any) => console.log(err));
  };

  const handleICECandidateEvent = (
    e: RTCPeerConnectionIceEvent,
    id: string
  ) => {
    if (!e.candidate || !socketRef.current) {
      return;
    }

    const payload: socketPayload = {
      target: id,
      caller: socketRef.current.id,
      candidate: e.candidate,
    };
    socketRef.current.emit("ice-candidate", payload);
  };

  const handleNewICECandidateMsg = (payload: socketPayload) => {
    const peerObj = peersRef.current.find(
      (peer) => peer.peerId === payload.caller
    );
    if (!peerObj) {
      return;
    }

    const candidate = new RTCIceCandidate(payload.candidate);

    peerObj.peer.addIceCandidate(candidate).catch((err) => console.log(err));
  };

  // const peers: peerContext[] = [];
  // for (let i = 0; i < 20; ++i) {
  //   peers.push({
  //     peerId: `${i}`,
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
