import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import firebase from "firebase";
import db from "./firebase";
import FlipMove from "react-flip-move";
import Message from "./Message";
import "./MeetingChat.css";

const MeetingChat = (props) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const user = useSelector(selectUser);

  const roomID = props.match.params.roomID;

  useEffect(() => {
    db.collection("rooms")
      .doc(roomID)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();

    db.collection("rooms").doc(roomID).collection("messages").add({
      displayName: user.displayName,
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
  };

  return (
    <div className="meeting__chat">
      <div className="chat__header">
        <h2>Chat</h2>
      </div>
      <div className="chat__messages">
        <FlipMove>
          {messages.map(({ id, data }) => (
            <Message key={id} contents={data} />
          ))}
        </FlipMove>
      </div>
      <div className="chat__footer">
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Type a message"
          />
          <button type="submit" onClick={sendMessage} />
        </form>
      </div>
    </div>
  );
};

export default MeetingChat;
