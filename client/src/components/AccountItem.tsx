import { SvgIconTypeMap } from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import React from "react";
import styles from "../styles/AccountItem.module.css";

type AccountItemProps = {
  text: string;
  Status?: any;
  LeftIcon?: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  RightIcon?: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

export const AccountItem: React.FC<AccountItemProps> = ({
  text,
  LeftIcon,
  RightIcon,
  Status,
  onClick,
}) => {
  return (
    <div className={styles.accountItem} onClick={onClick}>
      <div className={styles.left}>
        {LeftIcon ? (
          <div className={styles.iconContainer}>
            <div className={styles.icon}>
              <LeftIcon />
            </div>
          </div>
        ) : (
          Status
        )}
        {text && <h4>{text}</h4>}
      </div>

      {RightIcon && <RightIcon />}
    </div>
  );
};
