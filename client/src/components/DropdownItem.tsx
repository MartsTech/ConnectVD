import Avatar from "@material-ui/core/Avatar";
import React from "react";
import styles from "../styles/DropdownItem.module.css";

type dropdownItemProps = {
  text: string;
  avatar?: boolean;
  icon?: any;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

export const DropdownItem: React.FC<dropdownItemProps> = ({
  avatar,
  text,
  icon,
  onClick,
}) => {
  return (
    <div onClick={onClick} className={styles.dropdownItem}>
      {avatar && <Avatar className={styles.icon}>{text[0]}</Avatar>}
      {icon && (
        <div className={styles.iconContainer}>
          <div className={styles.icon}>{icon}</div>
        </div>
      )}
      {text && <h5>{text}</h5>}
    </div>
  );
};
