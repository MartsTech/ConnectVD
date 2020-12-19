import React from "react";
import Room from "./Room";
import "./Meeting.css";
import MeetingControls from "./MeetingControls";
import { selectChat } from "./features/controlsSlice";
import { useSelector } from "react-redux";
import MeetingChat from "./MeetingChat";

const Meeting = (props) => {
  const chat = useSelector(selectChat);

  return (
    <div className="meeting">
      <div className="meeting__main">
        <Room {...props} />
        <MeetingControls />
      </div>
      {chat && <MeetingChat {...props} />}
    </div>
  );
};

export default Meeting;
