import React from "react";
import { useSelector } from "react-redux";
import { MeetingChat } from "../components/MeetingChat";
import { MeetingControls } from "../components/MeetingControls";
import { Room } from "../components/Room";
import { selectChat } from "../features/controlsSlice";
import "../styles/Meeting.css";

const Meeting: React.FC<any> = (props) => {
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
