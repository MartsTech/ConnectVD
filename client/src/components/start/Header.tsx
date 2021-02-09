import { Button, IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/Header.module.css";

export const Header: React.FC = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.left}>
        <div className={styles.left}>
          <IconButton className={styles.menu}>
            <MenuIcon />
          </IconButton>
          <h1>ConnectVD</h1>
        </div>
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
    </nav>
  );
};
