import { Avatar, Button, IconButton } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { selectFriendEmail } from "../../features/friendSlice";
import { openSnackbar, setSnackbarContent } from "../../features/snackbarSlice";
import { selectUser } from "../../features/userSlice";
import { useFriendsQuery, useSendEmailMutation } from "../../generated/graphql";
import styles from "../../styles/SendMail.module.css";

type MailData = {
  to: string;
  subject: string;
  message: string;
};

const SendMail: React.FC = () => {
  const email = useSelector(selectFriendEmail);

  const [to, setTo] = useState<string>(email || "");

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const [, sendEmail] = useSendEmailMutation();
  const [{ data }] = useFriendsQuery({ variables: { uid: user!.uid } });

  const { register, handleSubmit, errors, setError } = useForm<MailData>();

  const history = useHistory();

  const onSubmit = async (input: MailData) => {
    if (to === "") {
      setError("to", { message: "Please enter an email" });
      return;
    }
    const options: MailData = {
      to,
      subject: input.subject,
      message: input.message,
    };
    const email = await sendEmail({ uid: user!.uid, options });
    if (email.data?.sendEmail.error) {
      setError("to", { message: email.data.sendEmail.error.message });
    } else if (email.data?.sendEmail.email) {
      dispatch(
        setSnackbarContent({
          message: "Email successfully sent.",
          status: "success",
        })
      );
      dispatch(openSnackbar());
      history.replace("/messages");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.tools}>
        <div className={styles.left}>
          <IconButton
            onClick={() => history.push("/messages")}
            name="arrowBack"
          >
            <ArrowBackIcon />
          </IconButton>
        </div>
        <div className={styles.right}></div>
      </div>
      <div className={styles.sendMail}>
        <div className={styles.header}>
          <h3>New Message</h3>
          <div className={styles.options}>
            <Button
              onClick={handleSubmit(onSubmit)}
              className={styles.send}
              variant="contained"
              color="primary"
              type="submit"
            >
              Send
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {data && (
            <Autocomplete
              options={data!.friends}
              getOptionLabel={(option) => option.user.email}
              renderOption={(option) => (
                <React.Fragment>
                  <div
                    className={styles.option}
                    onClick={() => {
                      setTo(option.id);
                    }}
                  >
                    <Avatar className={styles.icon} src={option.user.photoUrl}>
                      <span className={styles.letter}>
                        {option.user.email[0]}
                      </span>
                    </Avatar>
                    <p>{option.user.email}</p>
                  </div>
                </React.Fragment>
              )}
              renderInput={(params) => (
                <div className={styles.emailField} ref={params.InputProps.ref}>
                  <input
                    name="to"
                    placeholder="To"
                    type="email"
                    {...params.inputProps}
                    value={to}
                  />
                </div>
              )}
            />
          )}
          {errors.to && (
            <div className={styles.error}>{errors.to?.message}</div>
          )}
          <input
            name="subject"
            placeholder="Subject"
            type="text"
            ref={register({ required: true })}
          />
          {errors.subject && errors.subject.type === "required" && (
            <div className={styles.error}>Please enter a subject</div>
          )}
          <textarea
            name="message"
            placeholder="Message..."
            className={styles.message}
            ref={register({ required: true })}
          />
          {errors.message && errors.message.type === "required" && (
            <div className={styles.error}>Please enter a message</div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SendMail;
