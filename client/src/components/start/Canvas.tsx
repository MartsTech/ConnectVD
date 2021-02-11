import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import CanvasImage from "../../images/stock-photo-back-view-of-female-employee-speak-talk-on-video-call-with-diverse-multiracial-colleagues-on-online-1689338029.jpg";
import styles from "../../styles/Canvas.module.css";

export const Canvas: React.FC = () => {
  return (
    <section className={styles.canvas}>
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
    </section>
  );
};