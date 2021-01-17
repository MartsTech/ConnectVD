import React from "react";
import styles from "../styles/AccountItem.module.css";

type AccountItemProps = {
  text?: string;
  LeftIcon?: any;
  RightIcon?: any;
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

export const AccountItem: React.FC<AccountItemProps> = ({
  text,
  LeftIcon,
  RightIcon,
  onClick,
}) => {
  return (
    <div className={styles.accountItem} onClick={onClick}>
      <div className={styles.left}>
        {LeftIcon && LeftIcon}
        {text && <h4>{text}</h4>}
      </div>

      {RightIcon && RightIcon}
    </div>
  );
};
