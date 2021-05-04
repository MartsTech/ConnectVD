import { auth } from "@config/firebase";
import DesktopLayout from "@layout/DesktopLayout";
import IsAuth from "@layout/IsAuth";
import Emails from "@section/Emails";
import { createUrqlClient } from "@util/createUrqlClient";
import { useEmailsQuery } from "generated/graphql";
import { withUrqlClient } from "next-urql";
import { useAuthState } from "react-firebase-hooks/auth";

const EmailsPage = () => {
  const [user, loading] = useAuthState(auth);

  const [emailsData] = useEmailsQuery({
    pause: loading,
    variables: { uid: user?.uid as string, limit: 50 },
  });

  return (
    <IsAuth>
      <DesktopLayout title="Emails" Main={<Emails />} />
    </IsAuth>
  );
};

export default withUrqlClient(createUrqlClient)(EmailsPage);
