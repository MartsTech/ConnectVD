import { auth } from "@config/firebase";
import { iceConfiguration } from "@config/iceConfigs";
import Video from "@element/Video";
import VideoCover from "@element/VideoCover";
import { peerContext } from "@type/peerContext";
import { socketPayload } from "@type/socketPayload";
import { useJoinRoomMutation, UserInfo } from "generated/graphql";
import { useRouter } from "next/router";
import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import FlipMove from "react-flip-move";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";

interface RoomProps {
  socketRef: MutableRefObject<
    Socket<DefaultEventsMap, DefaultEventsMap> | undefined
  >;
  leave: boolean;
  screen: boolean;
  setScreen: Dispatch<SetStateAction<boolean>>;
  video: boolean;
  audio: boolean;
}

const Room: React.FC<RoomProps> = ({
  socketRef,
  leave,
  screen,
  setScreen,
  video,
  audio,
}) => {
  const [peers, setPeers] = useState<peerContext[]>([]);
  const peersRef = useRef<peerContext[]>([]);

  const senders = useRef<{ id: string; track: RTCRtpSender }[]>([]);
  const [videoStates, setVideoStates] = useState<
    { id: string; state: boolean }[]
  >([]);

  const userStream = useRef<MediaStream>();
  const userVideoRef = useRef<HTMLVideoElement>(null);

  const router = useRouter();

  const roomId = router.query.id as string;

  const [user] = useAuthState(auth);
  const [, joinRoom] = useJoinRoomMutation();

  useEffect(() => {
    const main = async () => {
      const stream = await getUserStream();
      userStream.current = stream;

      if (userVideoRef.current) {
        userVideoRef.current.srcObject = stream;
      }

      socketRef.current?.emit("get socketId");

      socketRef.current?.on("send socketId", async (socketId: string) => {
        const { data } = await joinRoom({
          uid: user?.uid as string,
          input: { roomId, socketId },
        });

        if (data?.joinRoom.users) {
          callUsers(data?.joinRoom.users, socketId);
        }
      });

      socketRef.current?.on("user left", (id: string) => {
        removeUser(id);
      });

      socketRef.current?.on(
        "video change",
        (payload: { id: string; state: boolean }) => {
          const videos = videoStates.filter((video) => video.id !== payload.id);
          setVideoStates([...videos, payload]);
        }
      );

      socketRef.current?.on("offer", handleOffer);
      socketRef.current?.on("answer", handleAnswer);
      socketRef.current?.on("ice-candidate", handleNewICECandidateMsg);
    };

    main();
  }, []);

  useEffect(() => {
    if (leave) {
      leaveRoom();
    }
    if (screen) {
      shareScreen();
    }
  }, [leave, screen]);

  useEffect(() => {
    toggleVideo(video);
  }, [video]);

  useEffect(() => {
    toggleAudio(audio);
  }, [audio]);

  const leaveRoom = () => {
    socketRef.current?.disconnect();
    userStream.current?.getTracks().forEach((track) => {
      track.stop();
    });
    router.replace("/dash");
  };

  const shareScreen = () => {
    navigator.mediaDevices
      // @ts-ignore
      .getDisplayMedia({
        cursor: true,
      })
      .then((stream: MediaStream) => {
        if (!userStream.current) {
          return;
        }

        const screenTrack = stream.getTracks()[0];
        const videoTrack = userStream.current.getTracks()[1];

        senders.current
          .find((sender) => sender.track.track?.kind === "video")
          ?.track.replaceTrack(screenTrack);

        screenTrack.onended = () => {
          senders.current
            .find((sender) => sender.track.track?.kind === "video")
            ?.track.replaceTrack(videoTrack);

          setScreen(false);
        };
      })
      .catch(() => setScreen(false));
  };

  const toggleVideo = (state: boolean) => {
    if (userStream.current) {
      try {
        userStream.current.getVideoTracks()[0].enabled = state;
      } catch {}
    }
    socketRef.current?.emit("toggle video", state);
  };

  const toggleAudio = (state: boolean) => {
    if (userStream.current) {
      try {
        userStream.current.getAudioTracks()[0].enabled = state;
      } catch {}
    }
  };

  const getUserStream = async () => {
    const devices = await navigator.mediaDevices.enumerateDevices();

    let stream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        video: devices.some((device) => device.kind === "videoinput"),
        audio: devices.some((device) => device.kind === "audioinput"),
      });
    } catch {
      stream = await navigator.mediaDevices.getUserMedia({
        video: false,
        audio: devices.some((device) => device.kind === "audioinput"),
      });
    }

    return stream;
  };

  const removeUser = (id: string) => {
    const peers = peersRef.current.filter((peer) => peer.peerId !== id);

    peersRef.current = peers;
    setPeers(peers);

    senders.current = senders.current.filter((sender) => sender.id !== id);

    const videos = videoStates.filter((video) => video.id !== id);
    setVideoStates(videos);
  };

  const callUsers = (users: UserInfo[], id: string) => {
    const peers: peerContext[] = [];

    users.forEach((info) => {
      if (info.socketId !== id) {
        const peer = createPeer(info.socketId);

        peersRef.current.push({
          peerId: info.socketId,
          peer,
        });
        peers.push({ peerId: info.socketId, peer });

        setTracks(info.socketId);
      }
    });

    setPeers(peers);
  };

  const acceptCall = (incoming: socketPayload) => {
    const peer = createPeer();
    const peerObj: peerContext = { peerId: incoming.caller, peer };

    peersRef.current.push({ peerId: incoming.caller, peer });
    setPeers((peers) => [...peers, peerObj]);
    setTracks(incoming.caller);

    setVideoStates((videos) => [
      ...videos,
      { id: incoming.caller, state: incoming.video as boolean },
    ]);

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

    userStream.current?.getTracks().forEach((track) =>
      senders.current.push({
        id,
        track: peerObj.peer.addTrack(track, userStream.current as MediaStream),
      })
    );
  };

  const handleNegotiationNeededEvent = (id: string) => {
    const peerObj = peersRef.current.find((peer) => peer.peerId === id);
    if (!peerObj) {
      return;
    }

    peerObj.peer
      .createOffer({ offerToReceiveAudio: true, offerToReceiveVideo: true })
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
          video,
          sdp: peerObj.peer.localDescription as RTCSessionDescription,
        };
        socketRef.current.emit("offer", payload);
      })
      .catch((err) => console.error(err));
  };

  const checkForDups = (id: string) => {
    const removeDups = peers.filter((peer) => peer.peerId !== id);
    setPeers(removeDups);
  };

  const handleOffer = (incoming: socketPayload) => {
    checkForDups(incoming.caller);
    const peerObj = acceptCall(incoming);

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
        if (!socketRef.current) {
          return;
        }

        const payload: socketPayload = {
          target: incoming.caller,
          caller: socketRef.current.id,
          video,
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

    setVideoStates((videos) => [
      ...videos,
      { id: message.caller, state: message.video as boolean },
    ]);

    const desc = new RTCSessionDescription(message.sdp);
    peerObj.peer
      .setRemoteDescription(desc)
      .catch((err: any) => console.log(err));
  };

  const handleICECandidateEvent = (
    e: RTCPeerConnectionIceEvent,
    id: string
  ) => {
    if (!e.candidate || !socketRef?.current) {
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

  return (
    <FlipMove
      className="h-full grid grid-cols-1 md:grid-cols-2 items-center
    overflow-y-scroll scrollbar-hide"
    >
      <VideoCover video={video}>
        <Video userVideoRef={userVideoRef} />
      </VideoCover>
      {peers.map((peerObj) => {
        const user = videoStates.find((user) => user.id === peerObj.peerId);

        return (
          <VideoCover
            key={peerObj.peerId}
            video={user?.state ? user.state : false}
          >
            <Video peer={peerObj.peer} />
          </VideoCover>
        );
      })}
    </FlipMove>
  );
};

export default Room;
