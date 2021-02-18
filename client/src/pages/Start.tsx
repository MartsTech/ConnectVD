import React from "react";
import styles from "../styles/Start.module.css";
import { Header } from "../components/start/Header";
import { Canvas } from "../components/start/Canvas";
import { Shortcuts } from "../components/start/Shortcuts";
import { Feature } from "../components/start/Feature";
import MeetingImg from "../images/meeting.jpg";
import MailImg from "../images/mail.jpg";
import NotificationsImg from "../images/notifications.jpg";
import FriendsImg from "../images/friends.jpg";
import { Footer } from "../components/start/Footer";

const Start: React.FC = () => {
  return (
    <div className={styles.start}>
      <Header />
      <div className={styles.message}>
        <p>We have developed resources to help you stay connect.</p>
      </div>
      <div className={styles.front}>
        <Canvas />
        <Shortcuts />
      </div>
      <div className={styles.features}>
        <Feature
          title="Meeting"
          desc="Instantly go to a video conference with the touch of a button. Enhance your experience with real time chat and share screen functionality."
          rightImg={<img src={MeetingImg} alt="meeting" />}
        />
        <Feature
          title="Mail"
          desc="Exchange quick mails with other users via our mail system. Send and receive mails in real time with close to no delay."
          leftImg={<img src={MailImg} alt="mail" />}
        />
        <Feature
          title="Friends"
          desc="Easily find your friends and send them friend requests. Notify your friends about your availability by changing your status."
          rightImg={<img src={FriendsImg} alt="friends" />}
        />

        <Feature
          title="Notifications"
          desc="Receive push notifications for important events and requests. Responde to them with a click of a button."
          leftImg={<img src={NotificationsImg} alt="notifications" />}
        />
      </div>
      <Footer />
    </div>
  );
};

export default Start;
