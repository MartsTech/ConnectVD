import React from "react";
import { useSelector } from "react-redux";
import { Chat } from "../components/meeting/Chat";
import { Controls } from "../components/meeting/Controls";
import { Room } from "../components/meeting/Room";
import { selectChat } from "../features/controlsSlice";
import styles from "../styles/Meeting.module.css";

const Meeting: React.FC = () => {
  const chat = useSelector(selectChat);

  return (
    <div className={styles.meeting}>
      <div className={styles.main}>
        <Room />
        <Controls />
      </div>
      {chat && <Chat />}
    </div>
  );
};

export default Meeting;
