import { Button } from "@material-ui/core";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import MicIcon from "@material-ui/icons/Mic";
import MicOffIcon from "@material-ui/icons/MicOff";
import ScreenShareIcon from "@material-ui/icons/ScreenShare";
import VideocamIcon from "@material-ui/icons/Videocam";
import VideocamOffIcon from "@material-ui/icons/VideocamOff";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import {
  selectAudio,
  selectChat,
  selectVideo,
  setAudio,
  setChat,
  setLeave,
  setScreen,
  setVideo,
} from "../features/controlsSlice";
import styles from "../styles/MeetingControls.module.css";

export const MeetingControls: React.FC = () => {
  const audio: boolean = useSelector(selectAudio);
  const video: boolean = useSelector(selectVideo);
  const chat: boolean = useSelector(selectChat);

  const history = useHistory();

  const dispatch = useDispatch();

  const leaveRoom = async () => {
    await dispatch(setLeave({ leave: true }));
    history.push("/");
  };

  return (
    <div className={styles.meetingControls}>
      <div className={styles.left}>
        <div
          onClick={() => {
            dispatch(setAudio({ audio: !audio }));
          }}
          className={styles.button}
        >
          {audio ? (
            <div className={styles.micOn}>
              <MicIcon fontSize="large" />
            </div>
          ) : (
            <div className={styles.micOff}>
              <MicOffIcon fontSize="large" />
            </div>
          )}
          {audio ? <h3>Mute</h3> : <h3>Unmute</h3>}
        </div>
        <div
          onClick={() => dispatch(setVideo({ video: !video }))}
          className={styles.button}
        >
          {video ? (
            <div className={styles.videoOn}>
              <VideocamIcon fontSize="large" />
            </div>
          ) : (
            <div className={styles.videoOff}>
              <VideocamOffIcon fontSize="large" />
            </div>
          )}
          {video ? <h3>Stop Video</h3> : <h3>Play Video</h3>}
        </div>
      </div>
      <div className={styles.center}>
        <div className={styles.shareScreen}>
          <div
            onClick={() => {
              dispatch(setScreen({ screen: true }));
            }}
            className={styles.button}
          >
            <ScreenShareIcon fontSize="large" />
            <h3>Share Screen</h3>
          </div>
        </div>
        <div className={styles.chat}>
          <div
            onClick={() => {
              dispatch(setChat({ chat: !chat }));
            }}
            className={styles.button}
          >
            <ChatBubbleIcon fontSize="large" />
            <h3>Chat</h3>
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <Button className={styles.button} onClick={leaveRoom}>
          <h3 id={styles.leave}>Leave Meeting</h3>
        </Button>
      </div>
    </div>
  );
};
