import React from "react";
import styles from "../../styles/Feature.module.css";

interface FeatureProps {
  title: string;
  desc: string;
  leftImg?: any;
  rightImg?: any;
}

export const Feature: React.FC<FeatureProps> = ({
  title,
  desc,
  leftImg,
  rightImg,
}) => {
  const info = (
    <div className={styles.info}>
      <h1>{title}</h1>
      <p>{desc}</p>
    </div>
  );

  return (
    <section className={styles.feature} id={title.toLocaleLowerCase()}>
      {leftImg && (
        <div className={styles.left}>
          <div className={styles.image}>{leftImg}</div>
          {info}
        </div>
      )}

      {rightImg && (
        <div className={styles.right}>
          {info}
          <div className={styles.image}>{rightImg}</div>
        </div>
      )}
    </section>
  );
};
