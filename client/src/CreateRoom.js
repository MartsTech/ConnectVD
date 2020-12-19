import React from "react";
import { v1 as uuid } from "uuid";
import { auth } from "./firebase";

const CreateRoom = (props) => {
  const create = () => {
    const id = uuid();
    props.history.push(`/room/${id}`);
  };

  const signOut = () => {
    auth.signOut();
  };

  return (
    <div>
      <button onClick={create}>Create Room</button>
      <button onClick={signOut}>Logout</button>
    </div>
  );
};

export default CreateRoom;
