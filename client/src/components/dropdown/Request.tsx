import { Button } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { CSSTransition } from "react-transition-group";
import { setAudio, setVideo } from "../../features/controlsSlice";
import {
  openMenu,
  selectActiveMenu,
  setMenuHeight,
} from "../../features/dropdownSlice";
import {
  selectFriendEmail,
  selectRequestType,
} from "../../features/friendSlice";
import { openSnackbar, setSnackbarContent } from "../../features/snackbarSlice";
import { selectUser } from "../../features/userSlice";
import {
  useAcceptFriendRequestMutation,
  useDeclineFriendRequestMutation,
  useAcceptInviteMutation,
  useDeclineInviteMutation,
} from "../../generated/graphql";
import styles from "../../styles/Dropdown.module.css";
import { Section } from "../Section";

export const Request: React.FC = () => {
  const activeMenu = useSelector(selectActiveMenu);

  const user = useSelector(selectUser);
  const email = useSelector(selectFriendEmail);
  const requestType = useSelector(selectRequestType);

  const dispatch = useDispatch();

  const [, acceptRequest] = useAcceptFriendRequestMutation();
  const [, declineRequest] = useDeclineFriendRequestMutation();
  const [, acceptInvite] = useAcceptInviteMutation();
  const [, declineInvite] = useDeclineInviteMutation();

  const history = useHistory();

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
                    if (requestType === "request") {
                      await acceptRequest({
                        uid: user!.uid,
                        email: email!,
                      });
                    } else {
                      const response = await acceptInvite({
                        uid: user!.uid,
                        email: email!,
                      });
                      if (response.data?.acceptInvite.error) {
                        dispatch(
                          setSnackbarContent({
                            message: response.data?.acceptInvite.error.message,
                            status: response.data?.acceptInvite.error
                              .status as any,
                          })
                        );
                        dispatch(openSnackbar());
                      } else if (response.data?.acceptInvite.roomId) {
                        dispatch(setAudio(false));
                        dispatch(setVideo(false));
                        history.push(
                          `/room/${response.data?.acceptInvite.roomId}`
                        );
                      }
                    }

                    dispatch(openMenu("notifications"));
                  }}
                  variant="contained"
                  color="primary"
                >
                  Accept
                </Button>
                <Button
                  onClick={async () => {
                    if (requestType === "request") {
                      await declineRequest({
                        uid: user!.uid,
                        email: email!,
                      });
                    } else if (requestType === "invite") {
                      await declineInvite({
                        uid: user!.uid,
                        email: email!,
                      });
                    }

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
