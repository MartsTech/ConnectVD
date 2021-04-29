import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMeQuery } from "../generated/graphql";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "firebaseConfig";

export const useIsAuth = () => {
  const [user, loading] = useAuthState(auth);

  const [{ data, fetching }] = useMeQuery({
    pause: loading,
    variables: { uid: user?.uid as string },
  });

  const router = useRouter();

  useEffect(() => {
    if (!fetching && !loading && !data?.me) {
      router.replace("/login?next=" + router.pathname);
    }
  }, [data, fetching, loading, router]);
};
