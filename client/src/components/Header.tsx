import { Avatar } from "@material-ui/core";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import styles from "../styles/Header.module.css";
import { Dropdown } from "./Dropdown";

const Header = () => {
  const [opened, setOpen] = useState(false);

  const user = useSelector(selectUser);

  return (
    <nav className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.left}>
          <h3>ConnectVD</h3>
        </div>
        <div className={styles.right}>
          {user && (
            <Avatar className={styles.avatar} onClick={() => setOpen(!opened)}>
              {user?.displayName[0]}
            </Avatar>
          )}
          {opened && <Dropdown />}
        </div>
      </div>
    </nav>
  );
};

export default Header;
