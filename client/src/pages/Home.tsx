import React from "react";
import { useSelector } from "react-redux";
import { Header } from "../components/Header";
import { HomeCards } from "../components/HomeCards";
import { JoinRoom } from "../components/JoinRoom";
import { Sidebar } from "../components/Sidebar";
import { selectDialog } from "../features/dialogSlide";
import styles from "../styles/Home.module.css";

const Home: React.FC = () => {
  const dialog = useSelector(selectDialog);
  return (
    <div className={styles.home}>
      <Header />
      <div className={styles.body}>
        <Sidebar />
        {dialog && <JoinRoom />}
        <div className={styles.main}>
          <HomeCards />
        </div>
      </div>
    </div>
  );
};

export default Home;
