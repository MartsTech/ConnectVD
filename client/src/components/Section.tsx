import React from "react";
import styles from "../styles/Section.module.css";

type SectionProps = {
  title?: string;
  el?: any;
  LeftIcon?: any;
  RightIcon?: any;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

export const Section: React.FC<SectionProps> = ({
  title,
  el,
  LeftIcon,
  RightIcon,
  onClick,
}) => {
  return (
    <div className={styles.section} onClick={onClick}>
      <div className={styles.left}>
        {LeftIcon && LeftIcon}
        {title && <h4>{title}</h4>}
        {el && el}
      </div>

      {RightIcon && RightIcon}
    </div>
  );
};
