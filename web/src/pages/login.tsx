import Button from "@element/Button";
import InputField from "@element/InputField";
import IsNotAuth from "@layout/IsNotAuth";
import LoginTemplate from "@template/LoginTemplate";
import { createUrqlClient } from "@util/createUrqlClient";
import { login, signIn } from "@util/signInMethods";
import { useSignInMutation } from "generated/graphql";
import { withUrqlClient } from "next-urql";
import Head from "next/head";
import { useState } from "react";

interface LoginProps {}

const Login: React.FC<LoginProps> = ({}) => {
  const [, signWithServer] = useSignInMutation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <IsNotAuth>
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LoginTemplate
        SignInButton={
          <Button
            title="Sign in with Google"
            onClick={() => signIn(signWithServer)}
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
            title="Login"
            onClick={() => login(signWithServer, email, password)}
          />
        }
      />
    </IsNotAuth>
  );
};

export default withUrqlClient(createUrqlClient)(Login);
