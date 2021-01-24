import { Avatar } from "@material-ui/core";
import React from "react";
import styles from "../styles/Profile.module.css";
import { Section } from "./Section";
import { StatusBadge } from "./StatusBadge";
import MailIcon from "@material-ui/icons/Mail";

interface ProfileProps {
  photoUrl: string;
  email: string;
  displayName: string;
  status: string;
  onMouseLeave: any;
}

export const Profile: React.FC<ProfileProps> = ({
  email,
  displayName,
  photoUrl,
  status,
  onMouseLeave,
}) => {
  return (
    <div className={styles.profile} onMouseLeave={onMouseLeave}>
      <div className={styles.main}>
        <StatusBadge className={styles.badge} status={status}>
          <Avatar className={styles.avatar} src={photoUrl}>
            <span className={styles.letter}>{email[0]}</span>
          </Avatar>
        </StatusBadge>

        <h3>{displayName}</h3>
        <p>{email}</p>
      </div>
      <div className={styles.items}>
        <Section title="Contact user" left={<MailIcon />} />
      </div>
    </div>
  );
};
