import { UserIcon } from "@heroicons/react/solid";
import DashFriend from "@module/DashFriend";
import mockFriends from "mockFriends";
import Button from "@element/Button";

interface DashFriendsProps {}

const DashFriends: React.FC<DashFriendsProps> = ({}) => {
  return (
    <div className="w-80 h-full overflow-y-scroll scrollbar-hide">
      <div
        className="text-center flex items-center bg-[#3f51b5] 
          text-white p-1 rounded-lg sticky z-10 top-0"
      >
        <UserIcon className="h-6 w-6 ml-2" />
        <p className="text-md font-medium ml-2">Friends</p>
      </div>
      <div className="space-y-1">
        {mockFriends.map((friend) => (
          <DashFriend info={friend} />
        ))}
        {mockFriends.length === 0 && (
          <div className="flex flex-col items:center">
            <h3 className="text-center p-4 text-md">
              You still have no friends.
            </h3>
            <Button title="Invite now" onClick={() => alert("Todo")} />
          </div>
        )}
      </div>
    </div>
  );
};

export default DashFriends;
