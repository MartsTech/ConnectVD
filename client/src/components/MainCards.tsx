import { IconButton } from "@material-ui/core";
import AddBoxIcon from "@material-ui/icons/AddBox";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { openDialog } from "../features/dialogSlide";
import { useCreateRoomMutation } from "../generated/graphql";
import styles from "../styles/MainCards.module.css";

export const MainCards: React.FC = () => {
  const [createRoom] = useCreateRoomMutation();

  const history = useHistory();

  const dispatch = useDispatch();

  const create = async () => {
    const { data } = await createRoom();
    history.push(`/room/${data?.createRoom}`);
  };
  return (
    <div className={styles.mainCards}>
      <div className={styles.cards}>
        <div className={styles.cardsLeft}>
          <div className={styles.card} id={styles.newMeeting}>
            <IconButton onClick={create}>
              <div className={styles.icon}>
                <VideoCallIcon />
              </div>
            </IconButton>
            <h3>New Meeting</h3>
          </div>
        </div>
        <div className={styles.cardsRight}>
          <div className={styles.card} id={styles.joinRoom}>
            <IconButton onClick={() => dispatch(openDialog())}>
              <div className={styles.icon}>
                <AddBoxIcon />
              </div>
            </IconButton>
            <h3>Join Meeting</h3>
          </div>
        </div>
      </div>
    </div>
  );
};
