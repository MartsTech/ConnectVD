import React, { lazy } from "react";
import "./Access.css";

const Login = lazy(() => import("./Login"));
const Register = lazy(() => import("./Register"));

const Access = (props) => {
  const path = props.history.location.pathname;

  return (
    <div className="access">
      <div className="access__left">{path === "/" && <Login {...props} />}</div>
      <div className="access__right">
        {path === "/register" && <Register {...props} />}
      </div>
    </div>
  );
};

export default Access;
