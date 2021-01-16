import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import { login } from "../features/userSlice";
import { auth, provider } from "../firebase";
import { useRegisterMutation } from "../generated/graphql";
import styles from "../styles/Login.module.css";

interface LoginProps extends RouteComponentProps<any> {}

const Login: React.FC<LoginProps> = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [registerUser] = useRegisterMutation();

  const dispatch = useDispatch();

  const signIn = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .then((userAuth) => {
        dispatch(
          login({
            displayName: userAuth.user?.displayName,
            uid: userAuth.user?.uid,
          })
        );
      })
      .then(() => {
        history.push("/");
      })
      .catch((err) => alert(err));
  };

  const signInGoogle = () => {
    auth
      .signInWithPopup(provider)
      .then((userAuth) => {
        registerUser({ variables: { id: userAuth.user!.uid } });
      })
      .then(() => {
        history.push("/");
      })
      .catch((err) => alert(err));
  };

  return (
    <div className={styles.login}>
      <h1>Log in to your account</h1>
      <div className={styles.google} onClick={signInGoogle}>
        <img
          alt="google"
          src="https://kgo.googleusercontent.com/profile_vrt_raw_bytes_1587515358_10512.png"
        />
        <button>Log in with Google</button>
      </div>

      <p>or</p>

      <form>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
        <Button type="submit" onClick={signIn}>
          Login
        </Button>
      </form>

      <p>
        Don't have an account?{" "}
        <Link className={styles.link} to="/register">
          <span>Sign Up</span>
        </Link>
      </p>
    </div>
  );
};

export default Login;
