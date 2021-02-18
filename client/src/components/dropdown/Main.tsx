import { Avatar } from "@material-ui/core";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { CSSTransition } from "react-transition-group";
import {
  openMenu,
  selectActiveMenu,
  setMenuHeight,
} from "../../features/dropdownSlice";
import { selectUser } from "../../features/userSlice";
import { auth } from "../../firebase";
import { useMeQuery } from "../../generated/graphql";
import styles from "../../styles/Dropdown.module.css";
import { Section } from "../Section";
import { StatusBadge } from "../StatusBadge";

export const Main: React.FC = () => {
  const user = useSelector(selectUser);
  const activeMenu = useSelector(selectActiveMenu);
  const dispatch = useDispatch();

  const [prevMenu, setPrevMenu] = useState<string>(activeMenu);

  const [{ data }] = useMeQuery({ variables: { uid: user!.uid } });

  const history = useHistory();

  useEffect(() => {
    setPrevMenu(activeMenu);
  }, [activeMenu]);

  const calcHeight = (el: any) => {
    const menuHeight = el.offsetHeight;
    dispatch(setMenuHeight(menuHeight));
  };

  const signOut = async () => {
    await auth.signOut();
    history.push("/");
  };

  return (
    <CSSTransition
      in={activeMenu === "main"}
      unmountOnExit
      timeout={500}
      classNames={
        activeMenu === "status" ||
        (activeMenu === "main" && prevMenu === "status")
          ? "primary"
          : "secondary"
      }
      onEnter={calcHeight}
    >
      <div className={styles.menu}>
        <div className={styles.profile}>
          <Avatar className={styles.avatar} src={data?.me?.photoUrl}>
            <span className={styles.letter}>{data?.me?.email[0]}</span>
          </Avatar>
          <h3>{data?.me?.displayName}</h3>
          <p>{data?.me?.email}</p>
        </div>
        <div className={styles.items}>
          <Section
            title={data?.me?.status}
            left={
              <StatusBadge
                status={data?.me?.status}
                className={styles.status}
              />
            }
            right={<ArrowForwardIosIcon />}
            onClick={() => dispatch(openMenu("status"))}
          />
          <Section
            title="Log Out"
            left={
              <div className={styles.icon}>
                <ExitToAppIcon />
              </div>
            }
            onClick={signOut}
          />
        </div>
      </div>
    </CSSTransition>
  );
};
