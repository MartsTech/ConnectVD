import { Avatar } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import PersonIcon from "@material-ui/icons/Person";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { openSnackbar, setSnackbarContent } from "../features/snackbarSlice";
import {
  useCreateFriendRequestMutation,
  useFriendsQuery,
} from "../generated/graphql";
import styles from "../styles/Sidebar.module.css";
import { Profile } from "./Profile";
import { Section } from "./Section";
import { SidebarOption } from "./SidebarOption";
import { StatusBadge } from "./StatusBadge";

export const Sidebar: React.FC = () => {
  const [email, setEmail] = useState<string>("");
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
      dispatch(
        setSnackbarContent({
          message: response.data.createFriendRequest.message,
          status: response.data.createFriendRequest.status as any,
        })
      );
      dispatch(openSnackbar());
      setEmail("");
    }
  };

  const timeout = (delay: number) => {
    return new Promise((res) => setTimeout(res, delay));
  };

  return (
    <div className={styles.sidebar}>
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
            <div
              className={styles.container}
              onClick={async () => {
                await timeout(500);
                setHeight("");
                if (active === user.email) {
                  setActive("");
                } else {
                  setActive(user.email);
                }
                await timeout(300);
                setHeight("246px");
              }}
            >
              <Section
                style={{ width: "100%" }}
                left={
                  <StatusBadge status={user.status}>
                    <Avatar src={user.photoUrl}>
                      <span className={styles.letter}>{user.email[0]}</span>
                    </Avatar>
                  </StatusBadge>
                }
                title={user.displayName}
              />
              {active === user.email && (
                <Profile
                  height={height}
                  displayName={user.displayName}
                  email={user.email}
                  photoUrl={user.photoUrl}
                  status={user.status}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
