import { Button } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/Header.module.css";
import LogoImg from "../../images/logo.png";

export const Header: React.FC = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.left}>
        <div className={styles.left}>
          <img className={styles.logo} src={LogoImg} alt="logo" />
        </div>
      </div>
      <div className={styles.middle}>
        <SearchIcon />
        <input placeholder="Search" type="text" />
      </div>
      <div className={styles.right}>
        <Link to="/login" className={styles.link}>
          <Button variant="contained" color="primary" disableElevation>
            Login
          </Button>
        </Link>
        <Link to="/register" className={styles.link}>
          <Button variant="outlined" disableElevation>
            Register
          </Button>
        </Link>
      </div>
    </nav>
  );
};
