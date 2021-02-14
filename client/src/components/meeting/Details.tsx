import React from "react";
import styles from "../../styles/Details.module.css";
import InfoIcon from "@material-ui/icons/Info";
import { useRouteMatch } from "react-router";
import { CopyToClipboard } from "react-copy-to-clipboard";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";

export const Details: React.FC = () => {
  const match = useRouteMatch();

  //@ts-ignore
  const roomId: string = match.params.roomId;

  return (
    <div className={styles.details}>
      <div className={styles.header}>
        <div className={styles.section}>
          <div className={styles.link}>
            <InfoIcon />
            <h4>Details</h4>
          </div>
        </div>
      </div>
      <div className={styles.body}>
        <h5>Joining info</h5>

        <p>{roomId}</p>

        <CopyToClipboard text={roomId}>
          <div className={styles.copyId}>
            <FileCopyOutlinedIcon />
            <p>Copy joining info</p>
          </div>
        </CopyToClipboard>
      </div>
    </div>
  );
};
