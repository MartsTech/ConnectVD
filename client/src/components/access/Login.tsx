import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { auth, provider } from "../../firebase";
import { useSignInMutation } from "../../generated/graphql";
import styles from "../../styles/Access.module.css";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const [, signIn] = useSignInMutation();

  const signInWithEmail = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        if (user) {
          signIn({
            options: {
              id: user.uid,
              email: user.email!,
              displayName: user.displayName!,
            },
          });
        }
      })
      .then(() => {
        history.push("/");
      })
      .catch((err) => alert(err.message));
  };

  const signInWithGoogle = () => {
    auth
      .signInWithPopup(provider)
      .then(({ user }) => {
        if (user) {
          signIn({
            options: {
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
    <div className={styles.section}>
      <div className={styles.container}>
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
          <Button type="submit" onClick={signInWithEmail}>
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
    </div>
  );
};

export default Login;
