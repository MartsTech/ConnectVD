import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./MeetingControls.css";
import MicIcon from "@material-ui/icons/Mic";
import MicOffIcon from "@material-ui/icons/MicOff";
import VideocamIcon from "@material-ui/icons/Videocam";
import VideocamOffIcon from "@material-ui/icons/VideocamOff";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";

const MeetingControls = () => {
  const [muted, setMuted] = useState(false);
  const [videoStoped, setVideoStoped] = useState(false);

  return (
    <div className="meeting__controls">
      <div className="meeting__controlsLeft">
        <div
          onClick={(e) => setMuted(!muted)}
          className="meeting__controlsButton"
        >
          {muted ? (
            <div className="micOff">
              <MicOffIcon fontSize="large" />
            </div>
          ) : (
            <div className="micOn">
              <MicIcon fontSize="large" />
            </div>
          )}
          {muted ? <h3>Unmute</h3> : <h3>Mute</h3>}
        </div>
        <div
          onClick={(e) => setVideoStoped(!videoStoped)}
          className="meeting__controlsButton"
        >
          {videoStoped ? (
            <div className="videoOff">
              <VideocamOffIcon fontSize="large" />
            </div>
          ) : (
            <div className="videoOn">
              <VideocamIcon fontSize="large" />
            </div>
          )}
          {videoStoped ? <h3>Play Video</h3> : <h3>Stop Video</h3>}
        </div>
      </div>
      <div className="meeting__controlsCenter">
        <div className="meeting__chat">
          <div onClick={(e) => {}} className="meeting__controlsButton">
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
