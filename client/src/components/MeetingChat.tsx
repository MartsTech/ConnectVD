import firebase from "firebase";
import React, { useEffect, useState } from "react";
import FlipMove from "react-flip-move";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import db from "../firebase";
import styles from "../styles/MeetingChat.module.css";
import { Message } from "./Message";

export const MeetingChat: React.FC<any> = (props) => {
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<
    Array<{ id: string; data: firebase.firestore.DocumentData }>
  >([]);

  const user = useSelector(selectUser);

  const roomId = props.match.params.roomId;

  useEffect(() => {
    db.collection("rooms")
      .doc(roomId)
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

  const sendMessage = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    db.collection("rooms").doc(roomId).collection("messages").add({
      displayName: user.displayName,
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
  };

  return (
    <div className={styles.meetingChat}>
      <div className={styles.header}>
        <h2>Chat</h2>
      </div>
      <div className={styles.messages}>
        <FlipMove>
          {messages.map(({ id, data }) => (
            <Message key={id} contents={data} />
          ))}
        </FlipMove>
      </div>
      <div className={styles.footer}>
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
