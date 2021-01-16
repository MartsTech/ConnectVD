import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import { login } from "../features/userSlice";
import { auth, provider } from "../firebase";
import { useRegisterMutation } from "../generated/graphql";
import styles from "../styles/Register.module.css";

interface RegisterProps extends RouteComponentProps<any> {}

const Register: React.FC<RegisterProps> = ({ history }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [registerUser] = useRegisterMutation();

  const dispatch = useDispatch();

  const register = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (!firstName && !lastName) {
      return alert("Please enter a full name");
    }

    const name = firstName + " " + lastName;

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userAuth) => {
        userAuth.user
          ?.updateProfile({ displayName: name })
          .then(() => {
            registerUser({ variables: { id: userAuth.user!.uid } });
          })
          .then(() => {
            dispatch(
              login({
                displayName: userAuth.user?.displayName,
                uid: userAuth.user?.uid,
              })
            );
          })
          .then(() => {
            history.push("/");
          });
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
    <div className={styles.register}>
      <div className={styles.container}>
        <h1>Create your account</h1>
        <div className={styles.google} onClick={signInGoogle}>
          <img
            alt="google"
            src="https://kgo.googleusercontent.com/profile_vrt_raw_bytes_1587515358_10512.png"
          />
          <button>Sign in with Google</button>
        </div>

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
          <Button type="submit" onClick={register}>
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
