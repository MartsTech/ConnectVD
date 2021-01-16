import React from "react";
import { useSelector } from "react-redux";
import { RouteComponentProps } from "react-router";
import { MeetingChat } from "../components/MeetingChat";
import { MeetingControls } from "../components/MeetingControls";
import { Room } from "../components/Room";
import { selectChat } from "../features/controlsSlice";
import styles from "../styles/Meeting.module.css";

interface MeetingProps extends RouteComponentProps<any> {}

const Meeting: React.FC<MeetingProps> = (props) => {
  const chat = useSelector(selectChat);

  return (
    <div className={styles.meeting}>
      <div className={styles.main}>
        <Room {...props} />
        <MeetingControls {...props} />
      </div>
      {chat && <MeetingChat {...props} />}
    </div>
  );
};

export default Meeting;
