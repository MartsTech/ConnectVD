import React, { lazy } from "react";
import { RouteComponentProps } from "react-router";
import styles from "../styles/Access.module.css";

const Login = lazy(() => import("../components/Login"));
const Register = lazy(() => import("../components/Register"));

interface AccessProps extends RouteComponentProps<any> {}

const Access: React.FC<AccessProps> = (props) => {
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
