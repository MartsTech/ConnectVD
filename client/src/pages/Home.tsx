import React, { lazy } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { AppWrapper } from "../components/AppWrapper";
import { JoinRoom } from "../components/JoinRoom";
import { selectDialog } from "../features/dialogSlide";
import styles from "../styles/Home.module.css";

const Cards = lazy(() => import("../components/home/HomeCards"));
const EmailList = lazy(() => import("../components/home/EmailList"));
const Mail = lazy(() => import("../components/home/Mail"));
const SendMail = lazy(() => import(`../components/home/SendMail`));

const Home: React.FC = () => {
  const dialog = useSelector(selectDialog);

  const history = useHistory();
  const path = history.location.pathname;
  return (
    <div className={styles.home}>
      {dialog && <JoinRoom />}
      <AppWrapper>
        {path === "/" && (
          <div className={styles.main}>
            <Cards />
          </div>
        )}
        {path === "/messages" && <EmailList />}
        {path === "/mail" && <Mail />}
        {path === "/sendMail" && <SendMail />}
      </AppWrapper>
    </div>
  );
};

export default Home;
