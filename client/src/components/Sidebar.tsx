import { Avatar } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import PersonIcon from "@material-ui/icons/Person";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../features/snackbarSlice";
import {
  useCreateFriendRequestMutation,
  useFriendsQuery,
} from "../generated/graphql";
import styles from "../styles/Sidebar.module.css";
import { Profile } from "./Profile";
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
  const [active, setActive] = useState<string>("");
  const [height, setHeight] = useState<string>("");

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

  const timeout = (delay: number) => {
    return new Promise((res) => setTimeout(res, delay));
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
        LeftIcon={PersonIcon}
        title="Friends"
        selected={true}
        number={data?.friends.length || 0}
      />
      <div className={styles.friends}>
        {data?.friends.map(({ user }) => (
          <div key={user.email} className={styles.friend}>
            {active !== user.email ? (
              <div
                onMouseEnter={async () => {
                  await timeout(500);
                  setActive(user.email);
                  await timeout(300);
                  setHeight("246px");
                }}
              >
                <Section
                  left={
                    <StatusBadge status={user.status}>
                      <Avatar src={user.photoUrl}>
                        <span className={styles.letter}>{user.email[0]}</span>
                      </Avatar>
                    </StatusBadge>
                  }
                  title={user.displayName}
                />
              </div>
            ) : (
              <Profile
                height={height}
                displayName={user.displayName}
                email={user.email}
                photoUrl={user.photoUrl}
                status={user.status}
                onMouseLeave={async () => {
                  await timeout(500);
                  setActive("");
                  await timeout(300);
                  setHeight("");
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
