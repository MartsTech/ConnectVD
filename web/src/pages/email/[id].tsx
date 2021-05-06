import { auth } from "@config/firebase";
import DesktopLayout from "@layout/DesktopLayout";
import IsAuth from "@layout/IsAuth";
import EmailView from "@section/EmailView";
import { createUrqlClient } from "@util/createUrqlClient";
import { useEmailsQuery } from "generated/graphql";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";

interface EmailPageProps {}

const EmailPage: React.FC<EmailPageProps> = ({}) => {
  const router = useRouter();

  const emailId = router.query.id;

  const [user, loading] = useAuthState(auth);
  const [emailsData] = useEmailsQuery({
    pause: loading,
    variables: {
      uid: user?.uid as string,
      limit: 50,
    },
  });

  return (
    <IsAuth>
      <DesktopLayout
        title="Emails"
        Main={
          <EmailView
            email={emailsData.data?.emails.emails.find(
              (email) => email.id === emailId
            )}
          />
        }
      />
    </IsAuth>
  );
};

export default withUrqlClient(createUrqlClient)(EmailPage);
