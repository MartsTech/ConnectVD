import React, { lazy } from "react";
import styles from "../styles/Access.module.css";

const Login = lazy(() => import("../components/Login"));
const Register = lazy(() => import("../components/Register"));

const Access: React.FC<any> = (props) => {
  const path = props.history.location.pathname;

  return (
    <div className={styles.access}>
      <div className={styles.left}>
        {path === "/login" && <Login {...props} />}
      </div>
      <div className={styles.right}>
        {path === "/register" && <Register {...props} />}
      </div>
    </div>
  );
};

export default Access;
