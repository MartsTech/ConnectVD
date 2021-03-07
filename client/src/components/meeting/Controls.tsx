import { IconButton } from "@material-ui/core";
import CallEndIcon from "@material-ui/icons/CallEnd";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import MicIcon from "@material-ui/icons/Mic";
import MicOffIcon from "@material-ui/icons/MicOff";
import ScreenShareIcon from "@material-ui/icons/ScreenShare";
import VideocamIcon from "@material-ui/icons/Videocam";
import VideocamOffIcon from "@material-ui/icons/VideocamOff";
import React, { useState } from "react";
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
import MoreVertIcon from "@material-ui/icons/MoreVert";
import GroupIcon from "@material-ui/icons/Group";

export const Controls: React.FC = () => {
  const [more, setMore] = useState<boolean>(false);

  const details = useSelector(selectDetails);
  const audio = useSelector(selectAudio);
  const video = useSelector(selectVideo);
  const chat = useSelector(selectChat);

  const history = useHistory();

  const dispatch = useDispatch();

  const leaveRoom = async () => {
    await dispatch(setLeave({ leave: true }));
    history.push("/");
  };

  const moreButtons = (
    <>
      <div className={styles.container} id={styles.invite}>
        <IconButton
          onClick={() => {
            dispatch(setDetails(!details));
            setMore(false);
          }}
          className={styles.button}
        >
          <GroupIcon />
        </IconButton>
        <p>Invite</p>
      </div>
      <div className={styles.container}>
        <IconButton
          onClick={() => {
            dispatch(setScreen({ screen: true }));
            setMore(false);
          }}
          className={styles.button}
        >
          <ScreenShareIcon />
        </IconButton>
        <p>Share Screen</p>
      </div>
      <div className={styles.container}>
        <IconButton
          onClick={() => {
            dispatch(setChat({ chat: !chat }));
            setMore(false);
          }}
          className={styles.button}
        >
          <ChatBubbleIcon />
        </IconButton>
        <p>Chat</p>
      </div>
    </>
  );

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
          <CallEndIcon />
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
        <div className={styles.moreButtons}>{moreButtons}</div>
        {more && <div className={styles.dropMore}>{moreButtons}</div>}
        <IconButton
          onClick={() => setMore(!more)}
          className={styles.button}
          id={styles.more}
        >
          <MoreVertIcon />
        </IconButton>
      </div>
    </div>
  );
};
