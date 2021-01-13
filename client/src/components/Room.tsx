import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import {
  selectAudio,
  selectLeave,
  selectScreen,
  selectVideo,
  setLeave,
  setScreen,
} from "../features/controlsSlice";
import { socketPayload } from "../types";
import { Video } from "./Video";
import styles from "../styles/Room.module.css";
import { useJoinRoomMutation, useUsersInRoomQuery } from "../generated/graphql";

export const Room: React.FC<any> = (props) => {
  const [peers, setPeers] = useState<any[]>([]);

  const userStream = useRef<MediaStream>();
  const userVideo = useRef<any>();
  const socketRef = useRef<SocketIOClient.Socket>();
  const peersRef = useRef<Array<{ id: string; peer: RTCPeerConnection }>>([]);
  const senders = useRef<any[]>([]);

  const dispatch = useDispatch();
  const audio: boolean = useSelector(selectAudio);
  const video: boolean = useSelector(selectVideo);
  const screen: boolean = useSelector(selectScreen);
  const leave: boolean = useSelector(selectLeave);

  const roomId: string = props.match.params.roomId;

  const [joinRoom] = useJoinRoomMutation();
  const { fetchMore } = useUsersInRoomQuery({
    skip: true,
  });

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
    getUserStream();
    socketRef.current = io.connect("/");
    socketRef.current.emit("get socketId");
    socketRef.current.on("send socketId", async (id: string) => {
      await joinRoom({
        variables: { roomId, socketId: id },
      });
      const { data } = await fetchMore({
        variables: { roomId },
      });
      const peers: Array<{ id: string; peer: RTCPeerConnection }> = [];
      data.usersInRoom.forEach(({ socketId }) => {
        if (socketId !== id) {
          const peer = createPeer(socketId);
          peersRef.current.push({ id: socketId, peer });
          peers.push({ id: socketId, peer });
          setTracks(socketId);
        }
      });
      setPeers(peers);
    });

    socketRef.current.on("user left", (id: string) => {
      const peers = peersRef.current.filter((peer) => peer.id !== id);
      peersRef.current = peers;
      setPeers(peers);
    });

    socketRef.current.on("offer", handleOffer);
    socketRef.current.on("answer", handleAnswer);
    socketRef.current.on("ice-candidate", handleNewICECandidateMsg);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const toggleAudio = (state: boolean) => {
      if (userStream.current) {
        const audioTrack = (userStream.current.getAudioTracks()[0].enabled = state);
        senders.current.forEach((sender) => {
          if (sender.track.kind === "audio") {
            sender.replaceTrack(audioTrack).catch(() => {});
          }
        });
      }
    };
    toggleAudio(audio);
  }, [audio]);

  useEffect(() => {
    const toggleVideo = (state: boolean) => {
      if (userStream.current) {
        const videoTrack = (userStream.current.getVideoTracks()[0].enabled = state);
        senders.current.forEach((sender) => {
          if (sender.track.kind === "video") {
            sender.replaceTrack(videoTrack).catch(() => {});
          }
        });
      }
    };
    toggleVideo(video);
  }, [video]);

  useEffect(() => {
    const shareScreen = async () => {
      // @ts-ignore
      const stream = await navigator.mediaDevices.getDisplayMedia({
        cursor: true,
      });
      const screenTrack = stream.getTracks()[0];
      senders.current.forEach((sender) => {
        if (sender.track.kind === "video") {
          sender.replaceTrack(screenTrack);
        }
      });

      screenTrack.onended = () => {
        senders.current.forEach((sender) => {
          if (sender.track.kind === "video") {
            sender.replaceTrack(userStream.current?.getTracks()[1]);
          }
        });
        dispatch(setScreen({ screen: false }));
      };
    };

    if (screen) {
      shareScreen();
    }
    // eslint-disable-next-line
  }, [screen]);

  useEffect(() => {
    if (leave) {
      socketRef.current?.disconnect();
      userStream.current?.getTracks().forEach((track) => {
        track.stop();
      });
      dispatch(setLeave({ leave: false }));
    }
    // eslint-disable-next-line
  }, [leave]);

  const getUserStream = async () => {
    const stream = await navigator.mediaDevices.getUserMedia(mediaConstraints);
    userStream.current = stream;
    userVideo.current.srcObject = stream;
  };

  const createPeer = (id: string | undefined) => {
    const peer = new RTCPeerConnection(iceConfiguration);

    if (id !== undefined) {
      peer.onnegotiationneeded = () => handleNegotiationNeededEvent(id);
      peer.onicecandidate = (e) => handleICECandidateEvent(e, id);
    }

    return peer;
  };

  const setTracks = (id: string) => {
    const peerObj = peersRef.current.find((peer) => peer.id === id);

    userStream.current?.getTracks().forEach((track) => {
      if (userStream.current) {
        senders.current.push(peerObj?.peer.addTrack(track, userStream.current));
      }
    });
  };

  const handleNegotiationNeededEvent = async (id: string) => {
    const peerObj = peersRef.current.find((peer) => peer.id === id);
    if (peerObj) {
      const offer = await peerObj.peer.createOffer();

      await peerObj.peer.setLocalDescription(offer);

      const payload = {
        target: id,
        caller: socketRef.current?.id,
        sdp: peerObj.peer.localDescription,
      };
      socketRef.current?.emit("offer", payload);
    }
  };

  const handleOffer = async (incoming: socketPayload) => {
    const peer = createPeer(undefined);
    peersRef.current.push({ id: incoming.caller, peer });
    const peerObj = peersRef.current.find(
      (peer) => peer.id === incoming.caller
    );
    setPeers((peers) => [...peers, peerObj]);
    setTracks(incoming.caller);

    if (peerObj) {
      const desc = new RTCSessionDescription(incoming.sdp);
      await peerObj.peer.setRemoteDescription(desc);

      const answer = await peerObj.peer.createAnswer();

      await peerObj.peer.setLocalDescription(answer);

      const payload = {
        target: incoming.caller,
        caller: socketRef.current?.id,
        sdp: peerObj.peer.localDescription,
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
      const payload = {
        target: id,
        caller: socketRef.current?.id,
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
      <video ref={userVideo} autoPlay playsInline muted />
      {peers.map((peerObj) => {
        return <Video key={peerObj.id} peer={peerObj.peer} />;
      })}
    </div>
  );
};
