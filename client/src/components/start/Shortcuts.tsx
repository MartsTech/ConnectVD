import React from "react";
import styles from "../../styles/Shortcuts.module.css";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import EmailIcon from "@material-ui/icons/Email";
import NotificationsIcon from "@material-ui/icons/Notifications";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import { IconButton } from "@material-ui/core";
import { Link } from "react-scroll";

export const Shortcuts: React.FC = () => {
  return (
    <section className={styles.shortcuts}>
      <div className={styles.icons}>
        <div className={styles.container}>
          <Link
            activeClass="active"
            to="meeting"
            spy={true}
            smooth={true}
            duration={1000}
          >
            <IconButton>
              <div className={styles.icon}>
                <VideoCallIcon />
              </div>
            </IconButton>
          </Link>
          <h3>Meeting</h3>
        </div>

        <div className={styles.container}>
          <Link
            activeClass="active"
            to="mail"
            spy={true}
            smooth={true}
            duration={1000}
          >
            <IconButton>
              <div className={styles.icon}>
                <EmailIcon />
              </div>
            </IconButton>
          </Link>
          <h3>Mail</h3>
        </div>
        <div className={styles.container}>
          <Link
            activeClass="active"
            to="friends"
            spy={true}
            smooth={true}
            duration={1000}
          >
            <IconButton>
              <div className={styles.icon}>
                <PeopleAltIcon />
              </div>
            </IconButton>
          </Link>
          <h3>Friends</h3>
        </div>
        <div className={styles.container}>
          <Link
            activeClass="active"
            to="notifications"
            spy={true}
            smooth={true}
            duration={1000}
          >
            <IconButton>
              <div className={styles.icon}>
                <NotificationsIcon />
              </div>
            </IconButton>
          </Link>
          <h3>Notification</h3>
        </div>
      </div>
    </section>
  );
};
