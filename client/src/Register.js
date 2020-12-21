import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "./features/userSlice";
import { auth, provider } from "./firebase";
import "./Register.css";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const register = (e) => {
    e.preventDefault();

    if (!firstName && !lastName) {
      return alert("Please enter a full name");
    }

    const name = firstName + " " + lastName;

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userAuth) => {
        userAuth.user.updateProfile({ displayName: name }).then(() => {
          dispatch(
            login({
              displayName: name,
              uid: userAuth.user.uid,
            })
          );
        });
      })
      .catch((err) => alert(err));
  };

  const signIn = () => {
    auth.signInWithPopup(provider).catch((err) => alert(err));
  };

  return (
    <div className="register">
      <h1>Sign Up</h1>
      <div className="google" onClick={(e) => signIn()}>
        <img src="https://kgo.googleusercontent.com/profile_vrt_raw_bytes_1587515358_10512.png" />
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
        <span className="register__link" onClick={register}>
          Log in now
        </span>
      </p>
    </div>
  );
};

export default Register;
