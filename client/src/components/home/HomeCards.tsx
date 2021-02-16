import { IconButton } from "@material-ui/core";
import AddBoxIcon from "@material-ui/icons/AddBox";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { openDialog } from "../../features/dialogSlice";
import { useCreateRoomMutation } from "../../generated/graphql";
import styles from "../../styles/HomeCards.module.css";
import PersonIcon from "@material-ui/icons/Person";
import MailIcon from "@material-ui/icons/Mail";

const HomeCards: React.FC = () => {
  const [, createRoom] = useCreateRoomMutation();

  const history = useHistory();

  const dispatch = useDispatch();

  const create = async () => {
    const { data } = await createRoom();
    history.push(`/room/${data?.createRoom}`);
  };
  return (
    <div className={styles.homeCards}>
      <div className={styles.cards}>
        <div className={styles.card} id={styles.newMeeting}>
          <IconButton onClick={create}>
            <div className={styles.icon}>
              <VideoCallIcon />
            </div>
          </IconButton>
          <h3>New Meeting</h3>
        </div>
        <div className={styles.card} id={styles.joinRoom}>
          <IconButton onClick={() => dispatch(openDialog())}>
            <div className={styles.icon}>
              <AddBoxIcon />
            </div>
          </IconButton>
          <h3>Join Meeting</h3>
        </div>
        <div className={styles.card} id={styles.addFriend}>
          <IconButton>
            <div className={styles.icon}>
              <PersonIcon />
            </div>
          </IconButton>
          <h3>Add Friend</h3>
        </div>
        <div className={styles.card} id={styles.sendMail}>
          <IconButton onClick={() => history.push(`/sendMail`)}>
            <div className={styles.icon}>
              <MailIcon />
            </div>
          </IconButton>
          <h3>Send Mail</h3>
        </div>
      </div>
    </div>
  );
};

export default HomeCards;
