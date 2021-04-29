import Avatar from "@element/Avatar";
import mockFriends from "mockFriends";

interface DashFriendProps {
  info: typeof mockFriends[0];
}

const DashFriend: React.FC<DashFriendProps> = ({
  info: { displayName, email, photoUrl, status },
}) => {
  return (
    <div
      className="flex items-center p-2 shadow-sm transition duration-100 
    transform hover:bg-gray-100 cursor-pointer border border-gray-100"
    >
      <Avatar src={photoUrl} status={status} />
      <h3 className="text-lg ml-2 font-medium text-gray-500">{displayName}</h3>
    </div>
  );
};

export default DashFriend;
