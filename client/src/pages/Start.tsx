import React from "react";
import styles from "../styles/Start.module.css";
import SearchIcon from "@material-ui/icons/Search";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import CanvasImage from "../images/stock-photo-back-view-of-female-employee-speak-talk-on-video-call-with-diverse-multiracial-colleagues-on-online-1689338029.jpg";

const Start: React.FC = () => {
  return (
    <div className={styles.start}>
      <div className={styles.header}>
        <div className={styles.left}>
          <h1>ConnectVD</h1>
        </div>
        <div className={styles.middle}>
          <SearchIcon />
          <input placeholder="Search" type="text" />
        </div>
        <div className={styles.right}>
          <Link to="/login" className={styles.link}>
            <Button>Login</Button>
          </Link>
          <Link to="/register" className={styles.link}>
            <Button>Register</Button>
          </Link>
        </div>
      </div>
      <div className={styles.message}>
        <p>We have developed resources to help you stay connect.</p>
      </div>
      <div className={styles.canvas}>
        <div className={styles.description}>
          <div className={styles.text}>
            <h1>ConnectVD</h1>
            <p>More ways to stay connect.</p>
          </div>
          <div className={styles.buttons}>
            <Link to="/register" className={styles.link}>
              <Button
                className={styles.button}
                variant="contained"
                color="primary"
                disableElevation
                size="large"
              >
                Sign up now
              </Button>
            </Link>
            <Link to="/login" className={styles.link}>
              <Button className={styles.button} variant="outlined" size="large">
                Login
              </Button>
            </Link>
          </div>
        </div>
        <div className={styles.canvasImage}>
          <img src={CanvasImage} alt="canvas" />
        </div>
      </div>
    </div>
  );
};

export default Start;
