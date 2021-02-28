import React from "react";
import { useSelector } from "react-redux";
import { Chat } from "../components/meeting/Chat";
import { Controls } from "../components/meeting/Controls";
import { Details } from "../components/meeting/Details";
import { Room } from "../components/meeting/Room";
import { Snackbar } from "../components/Snackbar";
import { selectChat } from "../features/controlsSlice";
import { selectDetails } from "../features/meetingSlice";
import {
  selectSnackbar,
  selectSnackbarContent
} from "../features/snackbarSlice";
import styles from "../styles/Meeting.module.css";

const Meeting: React.FC = () => {
  const chat = useSelector(selectChat);
  const details = useSelector(selectDetails);
  const snackbar = useSelector(selectSnackbar);
  const snackbarContent = useSelector(selectSnackbarContent);
  return (
    <div className={styles.meeting}>
      {snackbar && snackbarContent && (
        <Snackbar
          message={snackbarContent.message}
          status={snackbarContent.status}
        />
      )}
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
