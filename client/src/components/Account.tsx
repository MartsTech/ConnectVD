import { Avatar } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";
import {
  openMain,
  openStatus,
  selectDropdown,
} from "../features/dropdownSlice";
import { selectUser } from "../features/userSlice";
import { auth } from "../firebase";
import styles from "../styles/Account.module.css";
import "../styles/CSSTransition.css";
import { StatusBadge } from "./StatusBadge";
import { AccountItem } from "./AccountItem";

export const Account: React.FC = () => {
  const [menuHeight, setMenuHeight] = useState<any>(null);

  const activeMenu = useSelector(selectDropdown);
  const user = useSelector(selectUser);

  const dispatch = useDispatch();

  const calcHeight = (el: any) => {
    const height = el.offsetHeight;
    setMenuHeight(height);
  };

  return (
    <div className={styles.account} style={{ height: menuHeight }}>
      <CSSTransition
        in={activeMenu === "main"}
        unmountOnExit
        timeout={500}
        classNames="primary"
        onEnter={calcHeight}
      >
        <div className={styles.menu}>
          <div className={styles.profile}>
            <Avatar className={styles.avatar} src={user?.photoUrl}>
              <span className={styles.letter}>{user?.email[0]}</span>
            </Avatar>
            <h3>{user?.displayName}</h3>
            <p>{user?.email}</p>
          </div>
          <div className={styles.items}>
            <AccountItem
              text="Available"
              LeftIcon={
                <StatusBadge status="available" className={styles.status} />
              }
              RightIcon={<ArrowForwardIosIcon />}
              onClick={() => dispatch(openStatus())}
            />
            <AccountItem
              text="Log Out"
              LeftIcon={
                <div className={styles.icon}>
                  <ExitToAppIcon />
                </div>
              }
              onClick={() => auth.signOut()}
            />
          </div>
        </div>
      </CSSTransition>
      <CSSTransition
        in={activeMenu === "status"}
        unmountOnExit
        timeout={500}
        classNames="secondary"
        onEnter={calcHeight}
      >
        <div className={styles.menu}>
          <div className={styles.items}>
            <AccountItem
              LeftIcon={<ArrowBackIosIcon />}
              onClick={() => dispatch(openMain())}
            />
            <AccountItem
              text="Available"
              LeftIcon={
                <StatusBadge
                  status="available"
                  className={styles.status}
                  id={styles.available}
                />
              }
              onClick={() => console.log("available")}
            />
            <AccountItem
              text="Appear away"
              LeftIcon={
                <StatusBadge
                  status="away"
                  className={styles.status}
                  id={styles.available}
                />
              }
              onClick={() => console.log("appear away")}
            />
            <AccountItem
              text="Do not disturb"
              LeftIcon={
                <StatusBadge
                  status="busy"
                  className={styles.status}
                  id={styles.available}
                />
              }
              onClick={() => console.log("hello")}
            />
          </div>
        </div>
      </CSSTransition>
    </div>
  );
};
