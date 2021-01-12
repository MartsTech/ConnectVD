import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../features/userSlice";
import { auth, provider } from "../firebase";
import styles from "../styles/Login.module.css";

const Login: React.FC<any> = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const signIn = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        props.history.push("/");
      })
      .catch((err) => alert(err));
  };

  const signInGoogle = () => {
    auth
      .signInWithPopup(provider)
      .then(() => {
        props.history.push("/");
      })
      .catch((err) => alert(err));
  };

  return (
    <div className={styles.login}>
      <h1>Log in to your account</h1>
      <div className={styles.google} onClick={signInGoogle}>
        <img src="https://kgo.googleusercontent.com/profile_vrt_raw_bytes_1587515358_10512.png" />
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
        <Button type="submit" onClick={() => signIn}>
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
