import DesktopLayout from "@layout/DesktopLayout";
import IsAuth from "@layout/IsAuth";
import EmailView from "@section/EmailView";
import { createUrqlClient } from "@util/createUrqlClient";
import { withUrqlClient } from "next-urql";

interface EmailPageProps {}

const EmailPage: React.FC<EmailPageProps> = ({}) => {
  return (
    <IsAuth>
      <DesktopLayout title="Emails" Main={<EmailView />} />
    </IsAuth>
  );
};

export default withUrqlClient(createUrqlClient)(EmailPage);
