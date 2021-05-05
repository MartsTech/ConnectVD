import DesktopLayout from "@layout/DesktopLayout";
import IsAuth from "@layout/IsAuth";
import Invites from "@section/Invites";
import { createUrqlClient } from "@util/createUrqlClient";
import { withUrqlClient } from "next-urql";

interface InvitesPageProps {}

const InvitesPage: React.FC<InvitesPageProps> = ({}) => {
  return (
    <IsAuth>
      <DesktopLayout title="Invites" Main={<Invites />} />
    </IsAuth>
  );
};

export default withUrqlClient(createUrqlClient)(InvitesPage);
