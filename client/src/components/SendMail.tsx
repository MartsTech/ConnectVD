import { Button } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { closeSendMessage } from "../features/mailSlice";
import { useSendEmailMutation } from "../generated/graphql";
import styles from "../styles/SendMail.module.css";

type MailData = {
  to: string;
  subject: string;
  message: string;
};

export const SendMail: React.FC = () => {
  const dispatch = useDispatch();

  const [, sendEmail] = useSendEmailMutation();

  const { register, handleSubmit, errors, setError } = useForm<MailData>();

  const onSubmit = async (options: MailData) => {
    const email = await sendEmail({ options });
    if (email.data?.sendEmail.error) {
      setError("to", { message: email.data.sendEmail.error.message });
    } else if (email.data?.sendEmail.email) {
      dispatch(closeSendMessage());
    }
  };

  return (
    <div className={styles.sendMail}>
      <div className={styles.header}>
        <h3>New Message</h3>
        <CloseIcon
          className={styles.close}
          onClick={() => dispatch(closeSendMessage())}
        />
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
        {errors.to && <div className={styles.error}>{errors.to?.message}</div>}
        <input
          name="subject"
          placeholder="Subject"
          type="text"
          ref={register({ required: true })}
        />
        {errors.subject && errors.subject.type === "required" && (
          <div className={styles.error}>Please enter a subject</div>
        )}
        <input
          name="message"
          placeholder="Message..."
          type="text"
          className={styles.message}
          ref={register({ required: true })}
        />
        {errors.message && errors.message.type === "required" && (
          <div className={styles.error}>Please enter a message</div>
        )}

        <div className={styles.options}>
          <Button
            className={styles.send}
            variant="contained"
            color="primary"
            type="submit"
          >
            Send
          </Button>
        </div>
      </form>
    </div>
  );
};
