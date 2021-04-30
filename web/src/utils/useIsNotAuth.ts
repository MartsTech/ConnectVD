import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMeQuery } from "../generated/graphql";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@config/firebase";

export const useIsNotAuth = () => {
  const [user, loading] = useAuthState(auth);

  const [{ data, fetching }] = useMeQuery({
    pause: loading,
    variables: { uid: user?.uid as string },
  });

  const router = useRouter();

  useEffect(() => {
    if (!fetching && !loading && data?.me) {
      if (typeof router.query.next === "string") {
        router.push(router.query.next);
      } else {
        router.push("/dash");
      }
    }
  }, [data, fetching, loading, router]);
};
