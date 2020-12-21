import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectChat,
  selectAudio,
  selectVideo,
  setChat,
  setAudio,
  setVideo,
} from "./features/controlsSlice";
import MicIcon from "@material-ui/icons/Mic";
import MicOffIcon from "@material-ui/icons/MicOff";
import VideocamIcon from "@material-ui/icons/Videocam";
import VideocamOffIcon from "@material-ui/icons/VideocamOff";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import "./MeetingControls.css";

const MeetingControls = () => {
  const audio = useSelector(selectAudio);
  const video = useSelector(selectVideo);
  const chat = useSelector(selectChat);

  const dispatch = useDispatch();

  return (
    <div className="meeting__controls">
      <div className="meeting__controlsLeft">
        <div
          onClick={(e) => {
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
          onClick={(e) => dispatch(setVideo({ video: !video }))}
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
        <div className="meeting__chat">
          <div
            onClick={(e) => {
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
        <Link to="/" className="meeting__leave">
          <div className="meeting__controlsButton">
            <h3>Leave Meeting</h3>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default MeetingControls;
