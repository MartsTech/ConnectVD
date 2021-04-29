import Button from "@element/Button";
import InputField from "@element/InputField";
import LoginTemplate from "@template/LoginTemplate";
import { createUrqlClient } from "@util/createUrqlClient";
import { signIn } from "@util/signIn";
import { withUrqlClient } from "next-urql";
import Head from "next/head";
import { useState } from "react";
import { login } from "@util/login";
import DefaultWrapper from "layouts/DefaultWrapper";
import { useIsNotAuth } from "@util/useIsNotAuth";
import { useSignInMutation } from "generated/graphql";

interface LoginProps {}

const Login: React.FC<LoginProps> = ({}) => {
  useIsNotAuth();

  const [, signWithServer] = useSignInMutation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <DefaultWrapper>
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
    </DefaultWrapper>
  );
};

export default withUrqlClient(createUrqlClient)(Login);
