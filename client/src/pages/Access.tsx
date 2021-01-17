import React, { lazy } from "react";
import { useHistory } from "react-router";
import styles from "../styles/Access.module.css";

const Login = lazy(() => import("../components/Login"));
const Register = lazy(() => import("../components/Register"));

const Access: React.FC = () => {
  const history = useHistory();

  const path = history.location.pathname;

  return (
    <div className={styles.access}>
      <div className={styles.left}>{path === "/login" && <Login />}</div>
      <div className={styles.right}>{path === "/register" && <Register />}</div>
    </div>
  );
};

export default Access;
