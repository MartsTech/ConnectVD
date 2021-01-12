import { Avatar } from "@material-ui/core";
import firebase from "firebase";
import React, { forwardRef } from "react";
import * as timeago from "timeago.js";
import styles from "../styles/Message.module.css";

type messageProps = {
  contents: firebase.firestore.DocumentData;
};

export const Message: React.FC<messageProps> = forwardRef(
  ({ contents: { displayName, message, timestamp } }, ref: any) => {
    return (
      <div ref={ref} className={styles.message}>
        <Avatar className={styles.avatar}>{displayName[0]}</Avatar>
        <text>{message}</text>
        <small>
          {timeago.format(new Date(timestamp?.toDate()).toLocaleString())}
        </small>
      </div>
    );
  }
);
