import { Button } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";
import {
  openMenu,
  selectActiveMenu,
  setMenuHeight,
} from "../../features/dropdownSlice";
import { selectFriendEmail } from "../../features/friendSlice";
import { selectUser } from "../../features/userSlice";
import {
  useAcceptFriendRequestMutation,
  useDeclineFriendRequestMutation,
} from "../../generated/graphql";
import styles from "../../styles/Dropdown.module.css";
import { Section } from "../Section";

export const Request: React.FC = () => {
  const activeMenu = useSelector(selectActiveMenu);

  const user = useSelector(selectUser);
  const email = useSelector(selectFriendEmail);

  const dispatch = useDispatch();

  const [, acceptRequest] = useAcceptFriendRequestMutation();
  const [, declineRequest] = useDeclineFriendRequestMutation();

  const calcHeight = (el: any) => {
    const menuHeight = el.offsetHeight;
    dispatch(setMenuHeight(menuHeight));
  };

  return (
    <CSSTransition
      in={activeMenu === "request"}
      unmountOnExit
      timeout={500}
      classNames="secondary"
      onEnter={calcHeight}
    >
      <div className={styles.menu}>
        <div className={styles.items}>
          <Section
            left={
              <div className={styles.options}>
                <Button
                  onClick={async () => {
                    await acceptRequest({
                      uid: user!.uid,
                      email: email!,
                    });
                    dispatch(openMenu("notifications"));
                  }}
                  variant="contained"
                  color="primary"
                >
                  Accept
                </Button>
                <Button
                  onClick={async () => {
                    await declineRequest({
                      uid: user!.uid,
                      email: email!,
                    });
                    dispatch(openMenu("notifications"));
                  }}
                  variant="contained"
                  color="secondary"
                >
                  Decline
                </Button>
              </div>
            }
          />
        </div>
      </div>
    </CSSTransition>
  );
};
