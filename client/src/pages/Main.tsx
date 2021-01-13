import { IconButton } from "@material-ui/core";
import AddBoxIcon from "@material-ui/icons/AddBox";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import React from "react";
import Header from "../components/Header";
import { useCreateRoomMutation } from "../generated/graphql";
import styles from "../styles/Main.module.css";

const Main: React.FC<any> = (props) => {
  const [createRoom] = useCreateRoomMutation();
  const create = async () => {
    const { data } = await createRoom();
    props.history.push(`/room/${data?.createRoom.id}`);
  };

  return (
    <>
      <Header />
      <div className={styles.main}>
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
              <IconButton>
                <div className={styles.icon}>
                  <AddBoxIcon />
                </div>
              </IconButton>
              <h3>Join Meeting</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
