import Button from "@element/Button";
import DashFriend from "@module/DashFriend";
import { MeQuery } from "generated/graphql";

interface DashFriendsProps {
  data: MeQuery[];
}

const DashFriends: React.FC<DashFriendsProps> = ({ data }) => {
  return (
    <div className="w-72">
      <div>
        {data.map((friend, id) => (
          <DashFriend key={id} info={friend} />
        ))}
        {data.length === 0 && (
          <div className="flex flex-col items:center bg-primary-700 rounded-md pb-5">
            <h3 className="text-center p-4 text-md text-primary-100">
              You still have no friends.
            </h3>
            <div className="flex justify-center">
              <Button title="Invite now" onClick={() => alert("Todo")} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashFriends;
