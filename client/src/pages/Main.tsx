import { IconButton } from "@material-ui/core";
import AddBoxIcon from "@material-ui/icons/AddBox";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import { JoinRoom } from "../components/JoinRoom";
import { selectDialog, openDialog } from "../features/dialogSlide";
import { useCreateRoomMutation } from "../generated/graphql";
import styles from "../styles/Main.module.css";

const Main: React.FC<any> = (props) => {
  const [createRoom] = useCreateRoomMutation();

  const dispatch = useDispatch();
  const dialog = useSelector(selectDialog);

  const create = async () => {
    const { data } = await createRoom();
    props.history.push(`/room/${data?.createRoom.id}`);
  };

  return (
    <>
      <Header />
      {dialog && <JoinRoom {...props} />}
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
    </>
  );
};

export default Main;
