import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { login } from "../features/userSlice";
import { auth, provider } from "../firebase";
import { useRegisterMutation } from "../generated/graphql";
import styles from "../styles/Login.module.css";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const [registerUser] = useRegisterMutation();

  const dispatch = useDispatch();

  const signIn = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        if (user) {
          dispatch(
            login({
              displayName: user.displayName!,
              email: user.email!,
              photoUrl: user.photoURL!,
              uid: user.uid,
            })
          );
        }
      })
      .then(() => {
        history.push("/");
      })
      .catch((err) => alert(err));
  };

  const signInWithGoogle = () => {
    auth
      .signInWithPopup(provider)
      .then(({ user }) => {
        if (user) {
          registerUser({
            variables: {
              id: user.uid,
              email: user.email!,
              displayName: user.displayName!,
              photoUrl: user.photoURL!,
            },
          });
        }
      })
      .then(() => {
        history.push("/");
      })
      .catch((err) => alert(err));
  };

  return (
    <div className={styles.login}>
      <h1>Log in to your account</h1>
      <div className={styles.google} onClick={signInWithGoogle}>
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
