import React from "react";
import styles from "../styles/Start.module.css";
import { Header } from "../components/start/Header";
import { Canvas } from "../components/start/Canvas";
import { Shortcuts } from "../components/start/Shortcuts";
import { Feature } from "../components/start/Feature";
import MeetingImg from "../images/stock-vector-worker-using-computer-for-collective-virtual-meeting-and-group-video-conference-man-at-desktop-1661363914.jpg";
import MailImg from "../images/stock-vector-email-and-messaging-email-marketing-campaign-1381873973.jpg";
import NotificationsImg from "../images/stock-vector-notifications-on-calendar-schedule-for-alarm-friendly-reminder-for-software-notification-message-1560839906.jpg";
import FriendsImg from "../images/stock-vector-concept-of-referral-marketing-refer-a-friend-loyalty-program-promotion-method-group-of-people-or-1373185598.jpg";
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
          title="Friends"
          desc="Easily find your friends and send them friend requests. Notify your friends about your availability by changing your status."
          leftImg={<img src={FriendsImg} alt="friends" />}
        />
        <Feature
          title="Mail"
          desc="Exchange quick mails with other users via our mail system. Send and receive mails in real time with close to no delay."
          rightImg={<img src={MailImg} alt="mail" />}
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
