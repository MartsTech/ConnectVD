import React from "react";
import styles from "../styles/Section.module.css";

type SectionProps = {
  title?: string;
  left?: any;
  right?: any;
  onClick?: any;
  style?: React.CSSProperties;
};

export const Section: React.FC<SectionProps> = ({
  title,
  left,
  right,
  onClick,
  style,
}) => {
  return (
    <div className={styles.section} onClick={onClick} style={style}>
      <div className={styles.left}>
        {left && left}
        {title && <h4>{title}</h4>}
      </div>

      {right && right}
    </div>
  );
};
