import React, { forwardRef } from "react";
import { Avatar } from "@material-ui/core";
import * as timeago from "timeago.js";
import "./Message.css";

const Message = forwardRef(
  ({ id, contents: { displayName, message, timestamp } }, ref) => {
    return (
      <div ref={ref} className="message">
        <Avatar className="message__avatar">{displayName[0]}</Avatar>
        <text>{message}</text>
        <small>
          {timeago.format(new Date(timestamp?.toDate()).toLocaleString())}
        </small>
      </div>
    );
  }
);

export default Message;
