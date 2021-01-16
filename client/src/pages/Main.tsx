import React from "react";
import { useSelector } from "react-redux";
import { RouteComponentProps } from "react-router";
import { JoinRoom } from "../components/JoinRoom";
import { MainCards } from "../components/MainCards";
import { MiniDrawer } from "../components/Header";
import { selectDialog } from "../features/dialogSlide";
import styles from "../styles/Main.module.css";

interface MainProps extends RouteComponentProps<any> {}

const Main: React.FC<MainProps> = (props) => {
  const dialog = useSelector(selectDialog);
  return (
    <>
      <MiniDrawer />
      {dialog && <JoinRoom {...props} />}
      <div className={styles.main}>
        <div className={styles.container}>
          <MainCards {...props} />
        </div>
      </div>
    </>
  );
};

export default Main;
