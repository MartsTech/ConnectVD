import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router";
import io from "socket.io-client";
import {
  selectAudio,
  selectLeave,
  selectScreen,
  selectVideo,
  setLeave,
  setScreen,
} from "../../features/controlsSlice";
import { selectUser } from "../../features/userSlice";
import { useJoinRoomMutation, useMeQuery } from "../../generated/graphql";
import styles from "../../styles/Room.module.css";
import { socketPayload } from "../../types";
import { Video } from "./Video";
import { peerContext } from "../../types";
import { Avatar } from "@material-ui/core";
import clsx from "clsx";
import videoStyles from "../../styles/Video.module.css";
import { usePalette } from "react-palette";

export const Room: React.FC = () => {
  const [peers, setPeers] = useState<peerContext[]>([]);
  const [usersVideoStatus, setUsersVideoStatus] = useState<
    { id: string; state: boolean }[]
  >([]);

  const userStream = useRef<MediaStream>();
  const userVideo = useRef<any>();
  const socketRef = useRef<SocketIOClient.Socket>();
  const peersRef = useRef<peerContext[]>([]);
  const senders = useRef<Array<{ id: string; track: RTCRtpSender }>>([]);

  // const history = useHistory();
  const match: { params: { roomId: string } } = useRouteMatch();

  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const audio = useSelector(selectAudio);
  const video = useSelector(selectVideo);
  const screen = useSelector(selectScreen);
  const leave = useSelector(selectLeave);

  const { roomId } = match.params;

  const [, joinRoom] = useJoinRoomMutation();
  const [{ data: MeData }] = useMeQuery({ variables: { uid: user!.uid } });

  const { data: BgData } = usePalette(MeData?.me?.photoUrl || "");

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
    main();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    toggleAudio(audio);
  }, [audio]);

  useEffect(() => {
    toggleVideo(video);
  }, [video]);

  useEffect(() => {
    if (screen) {
      shareScreen();
    }
    // eslint-disable-next-line
  }, [screen]);

  useEffect(() => {
    if (leave) {
      leaveRoom();
    }
    // eslint-disable-next-line
  }, [leave]);

  const main = () => {
    // if (window.performance) {
    //   if (performance.navigation.type === 1) {
    //     socketRef.current?.disconnect();
    //   }
    // }
    getUserStream();
    socketRef.current = io(process.env.REACT_APP_SERVER_URL!);
    // socketRef.current = io.connect("/");
    socketRef.current.emit("get socketId");
    socketRef.current.on("send socketId", async (id: string) => {
      const { data } = await joinRoom({
        uid: user!.uid,
        input: { roomId, socketId: id },
      });

      const peers: peerContext[] = [];
      data?.joinRoom.users!.forEach((info) => {
        if (info.socketId !== id) {
          const peer = createPeer(info.socketId);
          peersRef.current.push({ id: info.socketId, email: info.email, peer });
          peers.push({ id: info.socketId, email: info.email, peer });
          setTracks(info.socketId);
        }
      });
      setPeers(peers);
    });

    socketRef.current.on("user left", (id: string) => {
      const peers = peersRef.current.filter((peer) => peer.id !== id);
      peersRef.current = peers;
      setPeers(peers);
      const tempSenders = senders.current.filter((sender) => sender.id !== id);
      senders.current = tempSenders;
    });

    socketRef.current.on(
      "change video",
      (payload: { id: string; state: boolean }) => {
        const users = usersVideoStatus.filter((user) => user.id !== payload.id);
        setUsersVideoStatus([...users, payload]);
      }
    );

    socketRef.current.on("offer", handleOffer);
    socketRef.current.on("answer", handleAnswer);
    socketRef.current.on("ice-candidate", handleNewICECandidateMsg);
  };

  const checkForDups = (id: string) => {
    const removeDups = peers.filter((peer) => peer.id !== id);
    setPeers(removeDups);
  };

  const getUserStream = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    userStream.current = stream;
    toggleAudio(audio);
    toggleVideo(video);
    userVideo.current.srcObject = stream;
  };

  const toggleAudio = (state: boolean) => {
    if (userStream.current) {
      userStream.current.getAudioTracks()[0].enabled = state;
    }
  };

  const toggleVideo = (state: boolean) => {
    if (userStream.current) {
      userStream.current.getVideoTracks()[0].enabled = state;
      socketRef.current?.emit("toggle video", state);
    }
  };

  const setTracks = (id: string) => {
    const peerObj = peersRef.current.find((peer) => peer.id === id);

    userStream.current?.getTracks().forEach((track) => {
      if (userStream.current) {
        senders.current.push({
          id,
          track: peerObj!.peer.addTrack(track, userStream.current),
        });
      }
    });
  };

  const shareScreen = async () => {
    let stream;
    try {
      // @ts-ignore
      stream = await navigator.mediaDevices.getDisplayMedia({
        cursor: true,
      });
    } catch {
      dispatch(setScreen({ screen: false }));
    }

    if (typeof stream !== "undefined") {
      const screenTrack = stream.getTracks()[0];
      senders.current.forEach((sender) => {
        if (sender.track.track!.kind === "video") {
          sender.track.replaceTrack(screenTrack);
        }
      });

      screenTrack.onended = () => {
        senders.current.forEach((sender) => {
          if (sender.track.track!.kind === "video") {
            sender.track.replaceTrack(userStream.current!.getTracks()[1]);
          }
        });
        dispatch(setScreen({ screen: false }));
      };
    }
  };

  const leaveRoom = () => {
    socketRef.current?.disconnect();
    userStream.current?.getTracks().forEach((track) => {
      track.stop();
    });
    dispatch(setLeave({ leave: false }));
  };

  const createPeer = (id: string | undefined) => {
    const peer = new RTCPeerConnection(iceConfiguration);

    if (id !== undefined) {
      peer.onnegotiationneeded = () => handleNegotiationNeededEvent(id);
      peer.onicecandidate = (e) => handleICECandidateEvent(e, id);
    }

    return peer;
  };

  const handleNegotiationNeededEvent = async (id: string) => {
    const peerObj = peersRef.current.find((peer) => peer.id === id);
    if (peerObj) {
      const offer = await peerObj.peer.createOffer();

      await peerObj.peer.setLocalDescription(offer);

      const payload: socketPayload = {
        target: id,
        caller: socketRef.current!.id,
        email: user!.email,
        sdp: peerObj.peer.localDescription!,
      };
      socketRef.current?.emit("offer", payload);
    }
  };

  const handleOffer = async (incoming: socketPayload) => {
    checkForDups(incoming.caller);
    const peer = createPeer(undefined);
    peersRef.current.push({ id: incoming.caller, email: incoming.email, peer });
    const peerObj = peersRef.current.find(
      (peer) => peer.id === incoming.caller
    );
    setPeers((peers) => [...peers, peerObj!]);
    setTracks(incoming.caller);

    if (peerObj) {
      const desc = new RTCSessionDescription(incoming.sdp);
      await peerObj.peer.setRemoteDescription(desc);

      const answer = await peerObj.peer.createAnswer();

      await peerObj.peer.setLocalDescription(answer);

      const payload: socketPayload = {
        target: incoming.caller,
        caller: socketRef.current!.id,
        email: user!.email,
        sdp: peerObj.peer.localDescription!,
      };
      socketRef.current?.emit("answer", payload);
    }
  };

  const handleAnswer = async (message: socketPayload) => {
    const peerObj = peersRef.current.find((peer) => peer.id === message.caller);
    const desc = new RTCSessionDescription(message.sdp);
    await peerObj?.peer
      .setRemoteDescription(desc)
      .catch((err) => console.error(err));
  };

  const handleICECandidateEvent = (
    e: RTCPeerConnectionIceEvent,
    id: string
  ) => {
    if (e.candidate) {
      const payload: socketPayload = {
        target: id,
        caller: socketRef.current!.id,
        email: user!.email,
        candidate: e.candidate,
      };
      socketRef.current?.emit("ice-candidate", payload);
    }
  };

  const handleNewICECandidateMsg = async (payload: socketPayload) => {
    const candidate = new RTCIceCandidate(payload.candidate);
    const peerObj = peersRef.current.find((peer) => peer.id === payload.caller);
    await peerObj?.peer
      .addIceCandidate(candidate)
      .catch((err) => console.error(err));
  };

  return (
    <div className={styles.videos}>
      <div className={videoStyles.video}>
        {BgData && (
          <div
            style={{ background: BgData.darkVibrant }}
            className={clsx(videoStyles.cover, {
              [videoStyles.videoOff]: video,
            })}
          >
            <Avatar src={MeData?.me?.photoUrl} />
            <h4>{MeData?.me?.displayName}</h4>
          </div>
        )}
        <video ref={userVideo} autoPlay playsInline muted />
      </div>
      {peers.map((peerObj: peerContext) => {
        const user = usersVideoStatus.find((user) => user.id === peerObj.id);
        return (
          <Video
            key={peerObj.email}
            peer={peerObj.peer}
            email={peerObj.email}
            state={user ? user.state : true}
          />
        );
      })}
    </div>
  );
};
