import Avatar from "@element/Avatar";
import { MeQuery } from "generated/graphql";

interface ProfileProps {
  data?: MeQuery;
  important?: boolean;
}

const Profile: React.FC<ProfileProps> = ({ data, important = false }) => {
  return (
    <div
      className={`flex flex-col space-y-1 py-7 px-14 items-center
      sticky z-10 top-0 text-center w-full rounded-md ${
        important ? "bg-primary-800" : "bg-primary-700"
      }`}
    >
      <Avatar src={data?.me?.photoUrl} size={2} status={data?.me?.status} />
      <h2 className="text-lg font-medium text-primary-100">
        {data?.me?.displayName}
      </h2>
      <h5 className="text-base text-primary-200">{data?.me?.email}</h5>
    </div>
  );
};

export default Profile;
