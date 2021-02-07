import React from "react";
import { EmailRow } from "../EmailRow";
import styles from "../../styles/EmailList.module.css";
import { Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { useDispatch, useSelector } from "react-redux";
import {
  openSendMessage,
  selectSendMessageIsOpen,
} from "../../features/mailSlice";
import { SendMail } from "../SendMail";
import { useEmailsQuery } from "../../generated/graphql";

const EmailList: React.FC = () => {
  const sendMail = useSelector(selectSendMessageIsOpen);
  const dispatch = useDispatch();

  const [{ data: Emails }] = useEmailsQuery({ variables: { limit: 50 } });

  return (
    <div className={styles.emailList}>
      <div className={styles.settings}>
        <div className={styles.left}></div>
        <div className={styles.right}></div>
      </div>
      <div className={styles.sections}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon fontSize="large" />}
          onClick={() => dispatch(openSendMessage())}
        >
          Compose
        </Button>
      </div>

      <div className={styles.list}>
        {Emails?.emails.emails.map((email) => (
          <EmailRow
            key={email.id}
            id={email.id}
            title={email.to}
            subject={email.subject}
            description={email.message}
            time={new Date(parseInt(email.createdAt)).toDateString()}
          />
        ))}
      </div>
      {sendMail && <SendMail />}
    </div>
  );
};

export default EmailList;
