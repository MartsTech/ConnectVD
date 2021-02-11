import { Button, IconButton } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { openSnackbar, setSnackbarContent } from "../../features/snackbarSlice";
import { useSendEmailMutation } from "../../generated/graphql";
import styles from "../../styles/SendMail.module.css";

type MailData = {
  to: string;
  subject: string;
  message: string;
};

const SendMail: React.FC = () => {
  const dispatch = useDispatch();

  const [, sendEmail] = useSendEmailMutation();

  const { register, handleSubmit, errors, setError } = useForm<MailData>();

  const history = useHistory();

  const onSubmit = async (options: MailData) => {
    const email = await sendEmail({ options });
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
          <input
            name="to"
            placeholder="To"
            type="email"
            ref={register({ required: true })}
          />
          {errors.to && errors.to.type === "required" && (
            <div className={styles.error}>Please enter an email</div>
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
