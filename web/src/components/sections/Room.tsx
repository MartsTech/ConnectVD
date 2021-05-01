import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import Video from "@module/Video";
import { useRouter } from "next/router";
import { peerContext } from "@type/peerContext";
import iceConfiguration from "@config/iceConfigs";
import { socketPayload } from "@type/socketPayload";

interface RoomProps {}

const Room: React.FC<RoomProps> = () => {
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

      socketRef.current!.emit("join room", roomId);

      socketRef.current!.on("other users", (users) => {
        callUsers(users);
      });

      socketRef.current!.on("user left", (id) => {
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

  const callUsers = (users: any) => {
    const peers: peerContext[] = [];

    users.forEach((id: string) => {
      const peer = createPeer(id);

      peersRef.current.push({ peerID: id, peer });
      peers.push({ peerID: id, peer });

      setTracks(id);
    });

    setPeers(peers);
  };

  const removeUser = (id: string) => {
    const peers = peersRef.current.filter((peer) => peer.peerID !== id);

    peersRef.current = peers;
    setPeers(peers);
  };

  const createPeer = (id?: string) => {
    const peer = new RTCPeerConnection(iceConfiguration);

    if (typeof id === "undefined") {
      return peer;
    }

    peer.onnegotiationneeded = async () =>
      await handleNegotiationNeededEvent(id);
    peer.onicecandidate = (e) => handleICECandidateEvent(e, id);

    return peer;
  };

  const setTracks = (id: string) => {
    const peerObj = peersRef.current.find((peer) => peer.peerID === id);
    if (typeof peerObj === "undefined") {
      return;
    }

    userStream.current
      ?.getTracks()
      .forEach((track) =>
        peerObj.peer.addTrack(track, userStream.current as MediaStream)
      );
  };

  const handleNegotiationNeededEvent = async (id: string) => {
    const peerObj = peersRef.current.find((peer) => peer.peerID === id);
    if (typeof peerObj === "undefined") {
      return;
    }

    const offer = await peerObj.peer.createOffer();
    await peerObj.peer.setLocalDescription(offer);

    if (typeof socketRef.current === "undefined") {
      return;
    }

    const payload = {
      target: id,
      caller: socketRef.current.id,
      sdp: peerObj.peer.localDescription,
    };

    socketRef.current.emit("offer", payload);
  };

  const handleOffer = async (incoming: socketPayload) => {
    const peer = createPeer();

    peersRef.current.push({ peerID: incoming.caller, peer });

    const peerObj = peersRef.current.find(
      (peer) => peer.peerID === incoming.caller
    );
    if (typeof peerObj === "undefined") {
      return;
    }

    setPeers((peers) => [...peers, peerObj]);

    const desc = new RTCSessionDescription(incoming.sdp);
    await peerObj.peer.setRemoteDescription(desc);

    userStream.current
      ?.getTracks()
      .forEach((track) =>
        peerObj.peer.addTrack(track, userStream.current as MediaStream)
      );

    const answer = await peerObj.peer.createAnswer();
    await peerObj.peer.setLocalDescription(answer);

    if (typeof socketRef.current === "undefined") {
      return;
    }

    const payload = {
      target: incoming.caller,
      caller: socketRef.current.id,
      sdp: peerObj.peer.localDescription,
    };

    socketRef.current.emit("answer", payload);
  };

  const handleAnswer = async (message: socketPayload) => {
    const peerObj = peersRef.current.find(
      (peer) => peer.peerID === message.caller
    );
    if (typeof peerObj === "undefined") {
      return;
    }

    const desc = new RTCSessionDescription(message.sdp);
    await peerObj.peer.setRemoteDescription(desc);
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
      (peer) => peer.peerID === payload.caller
    );
    if (typeof peerObj === "undefined") {
      return;
    }

    peerObj.peer.addIceCandidate(candidate).catch((err) => console.log(err));
  };

  return (
    <div className="">
      <div className="">
        <h1>{0}</h1>
        <video id="video" ref={userVideoRef} autoPlay playsInline muted />
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
