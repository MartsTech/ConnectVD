import React from "react";
import { useSelector } from "react-redux";
import { Chat } from "../components/meeting/Chat";
import { Controls } from "../components/meeting/Controls";
import { Details } from "../components/meeting/Details";
import { Room } from "../components/meeting/Room";
import { selectChat } from "../features/controlsSlice";
import { selectDetails } from "../features/meetingSlice";
import styles from "../styles/Meeting.module.css";

const Meeting: React.FC = () => {
  const chat = useSelector(selectChat);
  const details = useSelector(selectDetails);
  return (
    <div className={styles.meeting}>
      <div className={styles.main}>
        <Room />
        <Controls />
        {details && <Details />}
      </div>
      {chat && <Chat />}
    </div>
  );
};

export default Meeting;
