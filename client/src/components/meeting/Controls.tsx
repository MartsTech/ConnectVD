import { IconButton } from "@material-ui/core";
import CallEndIcon from "@material-ui/icons/CallEnd";
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
} from "../../features/controlsSlice";
import { selectDetails, setDetails } from "../../features/meetingSlice";
import styles from "../../styles/Controls.module.css";

export const Controls: React.FC = () => {
  const details = useSelector(selectDetails);
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
    <div className={styles.controls}>
      <div className={styles.left}>
        <div
          className={styles.details}
          onClick={() => dispatch(setDetails(!details))}
        >
          <h3>Meeting details</h3>
        </div>
      </div>
      <div className={styles.center}>
        <IconButton
          onClick={() => {
            dispatch(setAudio({ audio: !audio }));
          }}
          className={styles.button}
        >
          {audio ? (
            <div className={styles.micOn}>
              <MicIcon />
            </div>
          ) : (
            <div className={styles.micOff}>
              <MicOffIcon />
            </div>
          )}
        </IconButton>
        <IconButton
          id={styles.leave}
          className={styles.button}
          onClick={leaveRoom}
        >
          <h3>
            <CallEndIcon />
          </h3>
        </IconButton>
        <IconButton
          onClick={() => dispatch(setVideo({ video: !video }))}
          className={styles.button}
        >
          {video ? (
            <div className={styles.videoOn}>
              <VideocamIcon />
            </div>
          ) : (
            <div className={styles.videoOff}>
              <VideocamOffIcon />
            </div>
          )}
        </IconButton>
      </div>
      <div className={styles.right}>
        <IconButton
          onClick={() => {
            dispatch(setScreen({ screen: true }));
          }}
          className={styles.button}
        >
          <ScreenShareIcon />
        </IconButton>
        <IconButton
          onClick={() => {
            dispatch(setChat({ chat: !chat }));
          }}
          className={styles.button}
        >
          <ChatBubbleIcon />
        </IconButton>
      </div>
    </div>
  );
};
