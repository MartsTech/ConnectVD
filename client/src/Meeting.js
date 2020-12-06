import React from "react";
import Room from "./Room";
import "./Meeting.css";
import MeetingControls from "./MeetingControls";

const Meeting = (props) => {
  return (
    <div className="meeting">
      <div className="meeting__main">
        <Room {...props} />
        <MeetingControls />
      </div>
      <div className="meeting__chat"></div>
    </div>
  );
};

export default Meeting;
