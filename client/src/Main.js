import React from "react";
import { v1 as uuid } from "uuid";
import { auth } from "./firebase";
import { IconButton } from "@material-ui/core";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import "./Main.css";

const CreateRoom = (props) => {
  const create = () => {
    const id = uuid();
    props.history.push(`/room/${id}`);
  };

  return (
    <div className="main">
      <div className="main__cards">
        <div className="main__card main__newMeeting">
          <IconButton onClick={create}>
            <div className="main__icon">
              <VideoCallIcon />
            </div>
          </IconButton>
        </div>
        <div className="main__card">
          <button onClick={() => auth.signOut()}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default CreateRoom;
