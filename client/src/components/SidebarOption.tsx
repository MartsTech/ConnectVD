import { SvgIconTypeMap } from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import clsx from "clsx";
import React from "react";
import styles from "../styles/SidebarOption.module.css";

interface SidebarOptionProps {
  LeftIcon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  RightIcon?: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  title: string;
  number?: number;
  selected?: boolean;
}

export const SidebarOption: React.FC<SidebarOptionProps> = ({
  LeftIcon,
  RightIcon,
  title,
  number,
  selected,
}) => {
  return (
    <div
      className={clsx(styles.sidebarOption, {
        [styles.active]: selected,
      })}
    >
      <LeftIcon />
      <h3>{title}</h3>
      <p>{number}</p>
      {RightIcon && <RightIcon />}
    </div>
  );
};
