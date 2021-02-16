import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth, provider } from "../../firebase";
import { useSignInMutation } from "../../generated/graphql";
import styles from "../../styles/Access.module.css";

const Register: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [, signIn] = useSignInMutation();

  const history = useHistory();

  const register = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (!firstName && !lastName) {
      return alert("Please enter a full name");
    }

    const name = firstName + " " + lastName;

    auth
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        if (user) {
          user.updateProfile({ displayName: name }).then(() => {
            signIn({
              options: {
                id: user.uid,
                email: user.email!,
                displayName: user.displayName!,
                photoUrl: "null",
              },
            });
          });
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
        <h1>Create your account</h1>
        <Button
          onClick={signInWithGoogle}
          startIcon={
            <img
              className={styles.icon}
              alt="google"
              src="https://kgo.googleusercontent.com/profile_vrt_raw_bytes_1587515358_10512.png"
            />
          }
          variant="contained"
          color="primary"
        >
          Sign in with Google
        </Button>

        <p>or</p>

        <form>
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            type="text"
            placeholder="First name"
          />
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            type="text"
            placeholder="Last name"
          />
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
          <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={register}
          >
            Register
          </Button>
        </form>

        <p>
          Already have an account?{" "}
          <Link className={styles.link} to="/login">
            <span>Log in now</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
