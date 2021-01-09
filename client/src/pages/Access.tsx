import React, { lazy } from "react";
import "../styles/Access.css";

const Login = lazy(() => import("../components/Login"));
const Register = lazy(() => import("../components/Register"));

const Access: React.FC<any> = (props) => {
  const path = props.history.location.pathname;

  return (
    <div className="access">
      <div className="access__left">
        {path === "/login" && <Login {...props} />}
      </div>
      <div className="access__right">
        {path === "/register" && <Register {...props} />}
      </div>
    </div>
  );
};

export default Access;
