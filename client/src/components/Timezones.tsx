import React, { useEffect, useState } from "react";
import styles from "../styles/Timezones.module.css";

export const Timezones: React.FC = () => {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const getTime = () => {
      const timezone = new Date().toLocaleString("en-US", {
        timeZone: "America/New_York",
        hour: "2-digit",
        minute: "2-digit",
      });
      setTime(timezone);
    };

    getTime();

    const interval = setInterval(() => {
      getTime();
    }, 1000 * 60);
    return () => clearInterval(interval);
  }, []);
  //   setInterval(getTime, 1000);

  return (
    <div className={styles.timezones}>
      <div className={styles.left}>
        <div className={styles.header}>
          <h3>Office Time</h3>
        </div>
        <div className={styles.body}>
          <h1>{time}</h1>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.header}>
          <h3>Office Open</h3>
        </div>
        <div className={styles.body}>
          <h1>New York</h1>
        </div>
      </div>
    </div>
  );
};
