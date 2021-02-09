import React from "react";
import styles from "../../styles/Footer.module.css";
import { Link } from "react-scroll";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.goTop}>
        <Link
          activeClass="active"
          to="meeting"
          spy={true}
          smooth={true}
          duration={1000}
        >
          <div className={styles.topButton}>
            <ArrowUpwardIcon fontSize="large" />
          </div>
        </Link>
      </div>
    </footer>
  );
};
