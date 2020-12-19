import { Button } from "@material-ui/core";
import React from "react";
import { Canvas } from "react-three-fiber";
import { auth, provider } from "./firebase";
import "./Login.css";
import Stars from "./Stars";

const Login = () => {
  const signIn = () => {
    auth.signInWithPopup(provider).catch((err) => alert(err.message));
  };

  return (
    <div className="login">
      <div className="login__background">
        <Canvas>
          <Stars />
        </Canvas>
      </div>
      <div className="login__body">
        <div className="login__menu">
          <h1>ConnectVD</h1>
          <Button onClick={signIn}>Sign In</Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
