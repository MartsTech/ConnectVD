import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";
import { selectActiveMenu, setMenuHeight } from "../../features/dropdownSlice";
import styles from "../../styles/Dropdown.module.css";
import { Section } from "../Section";
import { selectUser } from "../../features/userSlice";
import { Avatar } from "@material-ui/core";

export const Notifications: React.FC = () => {
  const user = useSelector(selectUser);
  const activeMenu = useSelector(selectActiveMenu);

  const dispatch = useDispatch();

  const calcHeight = (el: any) => {
    const menuHeight = el.offsetHeight;
    dispatch(setMenuHeight(menuHeight));
  };

  return (
    <CSSTransition
      in={activeMenu === "notifications"}
      unmountOnExit
      timeout={500}
      classNames="primary"
      onEnter={calcHeight}
    >
      <div className={styles.menu}>
        <h3>Notifications</h3>
        <div className={styles.items}>
          <Section
            el={
              <div className={styles.message}>
                <p>
                  <span className={styles.sender}>{user?.displayName}</span>{" "}
                  sent you a friend request.
                </p>
                <small>3 days ago</small>
              </div>
            }
            LeftIcon={
              <Avatar src={user?.photoUrl}>
                <span className={styles.letter}>{user?.email[0]}</span>
              </Avatar>
            }
          />
        </div>
      </div>
    </CSSTransition>
  );
};
