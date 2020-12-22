import React from "react";
import { useSelector } from "react-redux";
import { selectChat } from "./features/controlsSlice";
import Room from "./Room";
import MeetingChat from "./MeetingChat";
import MeetingControls from "./MeetingControls";
import "./Meeting.css";

const Meeting = (props) => {
  const chat = useSelector(selectChat);

  return (
    <div className="meeting">
      <div className="meeting__main">
        <Room {...props} />
        <MeetingControls {...props} />
      </div>
      {chat && <MeetingChat {...props} />}
    </div>
  );
};

export default Meeting;
