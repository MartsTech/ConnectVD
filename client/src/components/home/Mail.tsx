import { IconButton } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import LabelImportantIcon from "@material-ui/icons/LabelImportant";
import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { selectOpenMail } from "../../features/mailSlice";
import styles from "../../styles/Mail.module.css";

const Mail: React.FC = () => {
  const history = useHistory();

  const selectedMail = useSelector(selectOpenMail);

  return (
    <div className={styles.mail}>
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
      <div className={styles.body}>
        <div className={styles.header}>
          <h2>{selectedMail?.subject}</h2>
          <div className={styles.email}>
            <LabelImportantIcon className={styles.important} />
            <p className={styles.title}>{selectedMail?.title}</p>
          </div>

          <p className={styles.time}>{selectedMail?.time}</p>
        </div>
        <div className={styles.message}>
          <p>{selectedMail?.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Mail;
