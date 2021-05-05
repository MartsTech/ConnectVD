import Button from "@element/Button";
import InputField from "@element/InputField";
import IsNotAuth from "@layout/IsNotAuth";
import LoginTemplate from "@template/LoginTemplate";
import { createUrqlClient } from "@util/createUrqlClient";
import { login, signIn, register } from "@util/signInMethods";
import { useSignInMutation } from "generated/graphql";
import { withUrqlClient } from "next-urql";
import Head from "next/head";
import { useSnackbar } from "notistack";
import { useState } from "react";

interface LoginProps {}

const Login: React.FC<LoginProps> = ({}) => {
  const [, signWithServer] = useSignInMutation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginMode, setLoginMode] = useState(true);

  const { enqueueSnackbar } = useSnackbar();

  return (
    <IsNotAuth>
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LoginTemplate
        SignInButton={
          <Button
            secondary
            extend={true}
            title={`${loginMode ? "Login" : "Sign up"} with Google`}
            onClick={() => signIn(signWithServer)}
          />
        }
        NameField={
          <InputField
            className={`${loginMode && "hidden"}`}
            type="name"
            value={name}
            setValue={setName}
          />
        }
        EmailField={
          <InputField type="email" value={email} setValue={setEmail} />
        }
        PasswordField={
          <InputField type="password" value={password} setValue={setPassword} />
        }
        LoginButton={
          <Button
            extend
            secondary
            title={loginMode ? "Login" : "Sign Up"}
            onClick={() => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
                enqueueSnackbar("Invalid email format", {
                  variant: "error",
                  autoHideDuration: 3000,
                });
                return;
              }
              loginMode
                ? login(signWithServer, email, password)
                : register(signWithServer, name, email, password);
            }}
          />
        }
        Switch={
          <div className="text-primary-100">
            {loginMode ? "Don't have an account?" : "Already have an account?"}{" "}
            <span
              onClick={() => setLoginMode(!loginMode)}
              className="text-primary-200 cursor-pointer"
            >
              {loginMode ? "Sign Up" : "Login now"}
            </span>
          </div>
        }
      />
    </IsNotAuth>
  );
};

export default withUrqlClient(createUrqlClient)(Login);
