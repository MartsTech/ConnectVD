import { SvgIconTypeMap } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import React from "react";
import styles from "../styles/DropdownItem.module.css";

type dropdownItemProps = {
  text: string;
  avatar?: boolean;
  Icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

export const DropdownItem: React.FC<dropdownItemProps> = ({
  avatar,
  text,
  Icon,
  onClick,
}) => {
  return (
    <div onClick={onClick} className={styles.dropdownItem}>
      {avatar && <Avatar className={styles.icon}>{text[0]}</Avatar>}
      {Icon && (
        <div className={styles.iconContainer}>
          <div className={styles.icon}>
            <Icon />
          </div>
        </div>
      )}
      {text && <h5>{text}</h5>}
    </div>
  );
};
