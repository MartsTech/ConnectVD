import DesktopLayout from "@layout/DesktopLayout";
import IsAuth from "@layout/IsAuth";
import SendEmail from "@section/SendEmail";
import { createUrqlClient } from "@util/createUrqlClient";
import { withUrqlClient } from "next-urql";

interface SendEmailPageProps {}

const SendEmailPage: React.FC<SendEmailPageProps> = ({}) => {
  return (
    <IsAuth>
      <DesktopLayout title="Send Email" Main={<SendEmail />} />
    </IsAuth>
  );
};

export default withUrqlClient(createUrqlClient)(SendEmailPage);
