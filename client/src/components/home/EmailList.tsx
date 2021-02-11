import { Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import React from "react";
import { useHistory } from "react-router";
import { useEmailsQuery } from "../../generated/graphql";
import styles from "../../styles/EmailList.module.css";
import { EmailRow } from "../EmailRow";

const EmailList: React.FC = () => {
  const [{ data: Emails }] = useEmailsQuery({ variables: { limit: 50 } });

  const history = useHistory();

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
          onClick={() => history.replace("/sendMail")}
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
    </div>
  );
};

export default EmailList;
