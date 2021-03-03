import React, { useState } from "react";
import styles from "../../styles/Details.module.css";
import InfoIcon from "@material-ui/icons/Info";
import { useRouteMatch } from "react-router";
import { CopyToClipboard } from "react-copy-to-clipboard";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import clsx from "clsx";
import TextField from "@material-ui/core/TextField";
import Autocomplete, {
  AutocompleteRenderInputParams,
} from "@material-ui/lab/Autocomplete";
import {
  useFriendsQuery,
  useInviteFriendMutation,
} from "../../generated/graphql";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { setSnackbarContent, openSnackbar } from "../../features/snackbarSlice";
import { Avatar } from "@material-ui/core";

export const Details: React.FC = () => {
  const [info, setInfo] = useState<boolean>(true);

  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const [{ data }] = useFriendsQuery({ variables: { uid: user!.uid } });
  const [, createInvite] = useInviteFriendMutation();

  const match = useRouteMatch();

  //@ts-ignore
  const roomId: string = match.params.roomId;

  const inviteFriend = async (
    params: AutocompleteRenderInputParams,
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    //@ts-ignore
    const email: string = params.inputProps.value;
    const response = await createInvite({
      uid: user!.uid,
      email,
    });
    if (response.data?.inviteFriend) {
      dispatch(
        setSnackbarContent({
          message: response.data?.inviteFriend.message,
          status: response.data.inviteFriend.status as any,
        })
      );
      dispatch(openSnackbar());
    }
  };

  return (
    <div className={styles.details}>
      <div className={styles.header}>
        <div className={styles.section}>
          <div
            className={clsx(styles.link, {
              [styles.active]: info,
            })}
            onClick={() => setInfo(true)}
          >
            <InfoIcon />
            <h4>Details</h4>
          </div>
          <div
            className={clsx(styles.link, {
              [styles.active]: !info,
            })}
            onClick={() => setInfo(false)}
          >
            <PeopleAltIcon />
            <h4>Invite</h4>
          </div>
        </div>
      </div>
      <div className={styles.body}>
        {info ? (
          <div className={styles.info}>
            <h5>Joining info</h5>

            <p>{roomId}</p>

            <CopyToClipboard text={roomId}>
              <div className={styles.copyId}>
                <FileCopyOutlinedIcon />
                <p>Copy joining info</p>
              </div>
            </CopyToClipboard>
          </div>
        ) : (
          <div className={styles.invite}>
            <Autocomplete
              options={data!.friends}
              getOptionLabel={(option) => option.user.email}
              renderOption={(option) => (
                <React.Fragment>
                  <Avatar className={styles.icon} src={option.user.photoUrl}>
                    <span className={styles.letter}>
                      {option.user.email[0]}
                    </span>
                  </Avatar>
                  {option.user.email}
                </React.Fragment>
              )}
              style={{ width: 300 }}
              renderInput={(params) => (
                <form
                  onSubmit={(e) => {
                    inviteFriend(params, e);
                    setInfo(true);
                  }}
                >
                  <TextField
                    {...params}
                    label="Select Friend"
                    variant="outlined"
                  />
                </form>
              )}
            />
          </div>
        )}
      </div>
    </div>
  );
};
