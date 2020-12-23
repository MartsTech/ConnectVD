import React from "react";
import { v1 as uuid } from "uuid";
import { IconButton } from "@material-ui/core";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import AddBoxIcon from "@material-ui/icons/AddBox";
import "./Main.css";

const CreateRoom = (props) => {
  const create = () => {
    const id = uuid();
    props.history.push(`/room/${id}`);
  };

  return (
    <div className="main">
      <div className="main__cards">
        <div className="main__cardsLeft">
          <div className="main__card" id="main__newMeeting">
            <IconButton onClick={create}>
              <div className="main__icon">
                <VideoCallIcon />
              </div>
            </IconButton>
            <h3>New Meeting</h3>
          </div>
        </div>
        <div className="main__cardsRight">
          <div className="main__card" id="main__joinRoom">
            <IconButton>
              <div className="main__icon">
                <AddBoxIcon />
              </div>
            </IconButton>
            <h3>Join Meeting</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRoom;
