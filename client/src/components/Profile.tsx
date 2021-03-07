import { Avatar } from "@material-ui/core";
import MailIcon from "@material-ui/icons/Mail";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { setFriendEmail } from "../features/friendSlice";
import styles from "../styles/Profile.module.css";
import { Section } from "./Section";
import { StatusBadge } from "./StatusBadge";
import NotInterestedIcon from "@material-ui/icons/NotInterested";
import { useUnfriendMutation } from "../generated/graphql";
import { selectUser } from "../features/userSlice";

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
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const [, unfriendUser] = useUnfriendMutation();

  const history = useHistory();

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
          onClick={() => {
            history.push("/sendMail");
            dispatch(setFriendEmail(email));
          }}
        />
        <Section
          title="Unfriend user"
          left={<NotInterestedIcon color="secondary" />}
          onClick={() => unfriendUser({ uid: user!.uid, email })}
        />
      </div>
    </div>
  );
};
