import React from "react";
import { useSelector } from "react-redux";
import { JoinRoom } from "../components/JoinRoom";
import { MainCards } from "../components/MainCards";
import { MiniDrawer } from "../components/Header";
import { selectDialog } from "../features/dialogSlide";
import styles from "../styles/Main.module.css";

const Main: React.FC = () => {
  const dialog = useSelector(selectDialog);
  return (
    <>
      <MiniDrawer />
      {dialog && <JoinRoom />}
      <div className={styles.main}>
        <div className={styles.container}>
          <MainCards />
        </div>
      </div>
    </>
  );
};

export default Main;
