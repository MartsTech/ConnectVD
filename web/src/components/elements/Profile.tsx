import Avatar from "@element/Avatar";
import { MeQuery } from "generated/graphql";

interface ProfileProps {
  data?: MeQuery;
}

const Profile: React.FC<ProfileProps> = ({ data }) => {
  return (
    <div
      className="flex flex-col space-y-1 border border-gray-100 
        py-7 px-14 items-center sticky z-10 top-0 bg-white
        text-center w-80"
    >
      <Avatar src={data?.me?.photoUrl} size={2} status={data?.me?.status} />
      <h2 className="text-lg font-medium text-gray-700">
        {data?.me?.displayName}
      </h2>
      <h5 className="text-base">{data?.me?.email}</h5>
    </div>
  );
};

export default Profile;
