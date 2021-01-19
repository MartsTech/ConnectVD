import React from "react";
import { useSelector } from "react-redux";
import { selectMenuHeight } from "../../features/dropdownSlice";
import "../../styles/CSSTransition.css";
import styles from "../../styles/Dropdown.module.css";
import { Main } from "./Main";
import { Notifications } from "./Notifications";
import { Status } from "./Status";

export const Dropdown: React.FC = () => {
  const menuHeight = useSelector(selectMenuHeight);

  return (
    <div className={styles.dropdown} style={{ height: menuHeight }}>
      <Main />
      <Status />
      <Notifications />
    </div>
  );
};
