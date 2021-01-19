import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";
import { selectActiveMenu, setMenuHeight } from "../../features/dropdownSlice";
import styles from "../../styles/Dropdown.module.css";
import { Section } from "../Section";
import { selectUser } from "../../features/userSlice";
import { Avatar } from "@material-ui/core";
import {
  useAcceptFriendRequestMutation,
  useFriendRequestsQuery,
} from "../../generated/graphql";
import * as timeago from "timeago.js";

export const Notifications: React.FC = () => {
  const user = useSelector(selectUser);
  const activeMenu = useSelector(selectActiveMenu);

  const dispatch = useDispatch();

  const { data } = useFriendRequestsQuery({ variables: { id: user!.uid } });
  const [acceptFriendRequest] = useAcceptFriendRequestMutation();

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
          {data?.friendRequests.map((request) => (
            <Section
              el={
                <div className={styles.message}>
                  <p>
                    <span className={styles.sender}>
                      {request.user.displayName}
                    </span>{" "}
                    sent you a friend request.
                  </p>
                  <small>
                    {timeago.format(
                      new Date(parseInt(request.createdAt)).toLocaleString()
                    )}
                  </small>
                </div>
              }
              LeftIcon={
                <Avatar src={request.user.photoUrl}>
                  <span className={styles.letter}>{request.user.email[0]}</span>
                </Avatar>
              }
              onClick={() =>
                acceptFriendRequest({
                  variables: {
                    input: { id: user!.uid, email: request.user.email },
                  },
                })
              }
            />
          ))}
        </div>
      </div>
    </CSSTransition>
  );
};
