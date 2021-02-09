import { Avatar } from "@material-ui/core";
import React from "react";
import styles from "../styles/Profile.module.css";
import { Section } from "./Section";
import { StatusBadge } from "./StatusBadge";
import MailIcon from "@material-ui/icons/Mail";
import { openSendMessage } from "../features/mailSlice";
import { useDispatch } from "react-redux";

interface ProfileProps {
  photoUrl: string;
  email: string;
  displayName: string;
  status: string;
  height: string;
}

export const Profile: React.FC<ProfileProps> = ({
  email,
  displayName,
  photoUrl,
  status,
  height,
}) => {
  const dispatch = useDispatch();
  return (
    <div style={{ height }} className={styles.profile}>
      <div className={styles.main}>
        <StatusBadge className={styles.badge} status={status}>
          <div className={styles.avatar}>
            <Avatar src={photoUrl}>
              <span className={styles.letter}>{email[0]}</span>
            </Avatar>
          </div>
        </StatusBadge>

        <h3>{displayName}</h3>
        <p>{email}</p>
      </div>
      <div className={styles.items}>
        <Section
          title="Contact user"
          left={<MailIcon />}
          onClick={() => dispatch(openSendMessage())}
        />
      </div>
    </div>
  );
};
