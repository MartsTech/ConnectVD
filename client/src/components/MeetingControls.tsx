import { Button } from "@material-ui/core";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import MicIcon from "@material-ui/icons/Mic";
import MicOffIcon from "@material-ui/icons/MicOff";
import ScreenShareIcon from "@material-ui/icons/ScreenShare";
import VideocamIcon from "@material-ui/icons/Videocam";
import VideocamOffIcon from "@material-ui/icons/VideocamOff";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
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
import "../styles/MeetingControls.css";

export const MeetingControls: React.FC<any> = (props) => {
  const audio: boolean = useSelector(selectAudio);
  const video: boolean = useSelector(selectVideo);
  const chat: boolean = useSelector(selectChat);

  const dispatch = useDispatch();

  const leaveRoom = async () => {
    await dispatch(setLeave({ leave: true }));
    props.history.push("/");
  };

  return (
    <div className="meeting__controls">
      <div className="meeting__controlsLeft">
        <div
          onClick={() => {
            dispatch(setAudio({ audio: !audio }));
          }}
          className="meeting__controlsButton"
        >
          {audio ? (
            <div className="micOn">
              <MicIcon fontSize="large" />
            </div>
          ) : (
            <div className="micOff">
              <MicOffIcon fontSize="large" />
            </div>
          )}
          {audio ? <h3>Mute</h3> : <h3>Unmute</h3>}
        </div>
        <div
          onClick={() => dispatch(setVideo({ video: !video }))}
          className="meeting__controlsButton"
        >
          {video ? (
            <div className="videoOn">
              <VideocamIcon fontSize="large" />
            </div>
          ) : (
            <div className="videoOff">
              <VideocamOffIcon fontSize="large" />
            </div>
          )}
          {video ? <h3>Stop Video</h3> : <h3>Play Video</h3>}
        </div>
      </div>
      <div className="meeting__controlsCenter">
        <div className="meeting__shareScreen">
          <div
            onClick={() => {
              dispatch(setScreen({ screen: true }));
            }}
            className="meeting__controlsButton"
          >
            <ScreenShareIcon fontSize="large" />
            <h3>Share Screen</h3>
          </div>
        </div>
        <div className="meeting__chat">
          <div
            onClick={() => {
              dispatch(setChat({ chat: !chat }));
            }}
            className="meeting__controlsButton"
          >
            <ChatBubbleIcon fontSize="large" />
            <h3>Chat</h3>
          </div>
        </div>
      </div>
      <div className="meeting__controlsRight">
        <Button className="meeting__controlsButton" onClick={leaveRoom}>
          <h3 id="meeting__leave">Leave Meeting</h3>
        </Button>
      </div>
    </div>
  );
};
