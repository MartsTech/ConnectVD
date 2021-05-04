import Avatar from "@element/Avatar";
import { User } from "generated/graphql";

interface ProfileProps {
  data?: User;
  important?: boolean;
}

const Profile: React.FC<ProfileProps> = ({ data, important = false }) => {
  return (
    <div
      className={`flex flex-col space-y-1 py-7 px-14 items-center
      sticky z-10 top-0 text-center w-72 rounded-md ${
        important ? "bg-primary-800" : "bg-primary-700"
      }`}
    >
      <Avatar src={data?.photoUrl} size={2} status={data?.status} />
      <h2 className="text-lg font-medium text-primary-100">
        {data?.displayName}
      </h2>
      <h5 className="text-base text-primary-200">{data?.email}</h5>
    </div>
  );
};

export default Profile;
