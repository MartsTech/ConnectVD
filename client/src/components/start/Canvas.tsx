import { Button } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import CanvasImage from "../../images/canvas.jpg";
import styles from "../../styles/Canvas.module.css";

export const Canvas: React.FC = () => {
  return (
    <section className={styles.canvas}>
      <div className={styles.description}>
        <div className={styles.text}>
          <h1>ConnectVD</h1>
          <p>More ways to stay connected.</p>
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
