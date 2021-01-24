import { Avatar } from "@material-ui/core";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import AddIcon from "@material-ui/icons/Add";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import InboxIcon from "@material-ui/icons/Inbox";
import LabelImportantIcon from "@material-ui/icons/LabelImportant";
import NearMeIcon from "@material-ui/icons/NearMe";
import NoteIcon from "@material-ui/icons/Note";
import PersonIcon from "@material-ui/icons/Person";
import StarIcon from "@material-ui/icons/Star";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../features/snackbarSlice";
import {
  useCreateFriendRequestMutation,
  useFriendsQuery,
} from "../generated/graphql";
import styles from "../styles/Sidebar.module.css";
import { Section } from "./Section";
import { SidebarOption } from "./SidebarOption";
import { Snackbar } from "./Snackbar";
import { StatusBadge } from "./StatusBadge";

export const Sidebar: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<{
    message: string;
    status: "error" | "warning" | "info" | "success";
  }>();

  const dispatch = useDispatch();

  const [{ data }] = useFriendsQuery();
  const [, createFriendRequest] = useCreateFriendRequestMutation();

  const submitEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email === "") {
      return;
    }
    const response = await createFriendRequest({
      email,
    });
    if (response.data?.createFriendRequest) {
      setMessage({
        message: response.data.createFriendRequest.message,
        status: response.data.createFriendRequest.status as any,
      });
      dispatch(openSnackbar());
      setEmail("");
    }
  };

  return (
    <div className={styles.sidebar}>
      {message && (
        <Snackbar message={message.message} status={message.status} />
      )}

      <form onSubmit={submitEmail} className={styles.addFriend}>
        <AddIcon />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Add Friend"
        />
      </form>

      <SidebarOption
        LeftIcon={InboxIcon}
        title="Inbox"
        number={54}
        selected={true}
      />
      <SidebarOption LeftIcon={StarIcon} title="Starred" number={54} />
      <SidebarOption LeftIcon={AccessTimeIcon} title="Snoozed" number={54} />
      <SidebarOption
        LeftIcon={LabelImportantIcon}
        title="Important"
        number={54}
      />

      <SidebarOption LeftIcon={NearMeIcon} title="Sent" number={54} />
      <SidebarOption LeftIcon={NoteIcon} title="Drafts" number={54} />
      <SidebarOption
        LeftIcon={PersonIcon}
        title="Friends"
        RightIcon={ExpandMoreIcon}
        number={54}
      />
      <div className={styles.friends}>
        {data?.friends.map(({ user }) => (
          <Section
            key={user.email}
            left={
              <StatusBadge status={user.status}>
                <Avatar src={user.photoUrl}>
                  <span className={styles.letter}>{user.email[0]}</span>
                </Avatar>
              </StatusBadge>
            }
            title={user.displayName}
          />
        ))}
      </div>
    </div>
  );
};
