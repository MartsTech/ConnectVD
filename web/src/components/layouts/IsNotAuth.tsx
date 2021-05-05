import { auth } from "@config/firebase";
import Loader from "@section/Loader";
import { useMeQuery } from "generated/graphql";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

interface IsNotAuthProps {}

const IsNotAuth: React.FC<IsNotAuthProps> = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  const [{ data, fetching }] = useMeQuery({
    pause: loading,
    variables: { uid: user?.uid as string },
  });

  const router = useRouter();

  useEffect(() => {
    if (!fetching && !loading && data?.me) {
      router.push("/dash");
    }
  }, [data, fetching, loading, router]);

  if (!fetching && !loading && !data?.me) {
    return <>{children}</>;
  }

  return <Loader />;
};

export default IsNotAuth;
