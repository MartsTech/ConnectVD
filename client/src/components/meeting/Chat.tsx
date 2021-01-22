import firebase from "firebase";
import React, { useEffect, useState } from "react";
import FlipMove from "react-flip-move";
import { useRouteMatch } from "react-router";
import db from "../../firebase";
import { useMeQuery } from "../../generated/graphql";
import { Message } from "../Message";
import styles from "../../styles/Chat.module.css";

export const Chat: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<
    Array<{ id: string; data: firebase.firestore.DocumentData }>
  >([]);

  const { data } = useMeQuery();

  const match: any = useRouteMatch();

  const roomId = match.params.roomId;

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
    // eslint-disable-next-line
  }, []);

  const sendMessage = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    db.collection("rooms").doc(roomId).collection("messages").add({
      displayName: data?.me?.displayName,
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
  };

  return (
    <div className={styles.chat}>
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
