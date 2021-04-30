import Button from "@element/Button";
import SectionLabel from "@element/SectionLabel";
import { UserIcon, UsersIcon } from "@heroicons/react/solid";
import DashFriend from "@module/DashFriend";
import { MeQuery } from "generated/graphql";

interface DashFriendsProps {
  data: MeQuery[];
}

const DashFriends: React.FC<DashFriendsProps> = ({ data }) => {
  return (
    <div className="bg-white">
      <SectionLabel Icon={UsersIcon} title="Friends" />
      <div>
        {data.map((friend, id) => (
          <DashFriend key={id} info={friend} />
        ))}
        {data.length === 0 && (
          <div className="flex flex-col items:center pb-5">
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
