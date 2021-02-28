import { Avatar } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";
import * as timeago from "timeago.js";
import {
  openMenu,
  selectActiveMenu,
  setMenuHeight,
} from "../../features/dropdownSlice";
import { setFriendEmail, setRequestType } from "../../features/friendSlice";
import { selectUser } from "../../features/userSlice";
import {
  useFriendRequestsQuery,
  useInvitesQuery,
} from "../../generated/graphql";
import styles from "../../styles/Dropdown.module.css";
import { Section } from "../Section";

export const Notifications: React.FC = () => {
  const activeMenu = useSelector(selectActiveMenu);

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const [{ data: FriendRequests }] = useFriendRequestsQuery({
    variables: { uid: user!.uid },
  });
  const [{ data: Invites }] = useInvitesQuery({
    variables: { uid: user!.uid },
  });

  const calcHeight = (el: any) => {
    const menuHeight = el.offsetHeight;
    dispatch(setMenuHeight(menuHeight));
  };

  const notification = (
    request: any,
    message: string,
    type: "request" | "invite"
  ) => (
    <Section
      key={request.user.email}
      left={
        <>
          <Avatar src={request.user.photoUrl}>
            <span className={styles.letter}>{request.user.email[0]}</span>
          </Avatar>
          <div className={styles.message}>
            <p>
              <span className={styles.sender}>{request.user.displayName}</span>{" "}
              {message}
            </p>
            <small>
              {timeago.format(
                new Date(parseInt(request.createdAt)).toLocaleString()
              )}
            </small>
          </div>
        </>
      }
      onClick={() => {
        dispatch(setFriendEmail(request.user.email));
        dispatch(setRequestType(type));
        dispatch(openMenu("request"));
      }}
    />
  );

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
          {FriendRequests?.friendRequests.map((request) =>
            notification(request, "sent you a friend request.", "request")
          )}
          {Invites?.invites.map((request) =>
            notification(request, "sent you an invite.", "invite")
          )}
        </div>
      </div>
    </CSSTransition>
  );
};
