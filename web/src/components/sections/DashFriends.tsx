import Button from "@element/Button";
import DashFriend from "@module/DashFriend";
import { FriendsQuery } from "generated/graphql";
import FlipMove from "react-flip-move";

interface DashFriendsProps {
  data?: FriendsQuery;
  onNoFriends?: () => void;
}

const DashFriends: React.FC<DashFriendsProps> = ({ data, onNoFriends }) => {
  return (
    <div className="flex-grow sm:w-72 h-full bg-primary-700">
      <FlipMove>
        {data?.friends.map((friend) => (
          <DashFriend key={friend.id} info={friend.user} />
        ))}
      </FlipMove>
      {data?.friends.length === 0 && (
        <div className="flex flex-col items:center bg-primary-700 rounded-md pb-5">
          <div className="">
            <h3 className="text-center p-4 text-md text-primary-100">
              You still have no friends.
            </h3>
            <div className="flex justify-center">
              <Button
                title="Invite now"
                onClick={
                  typeof onNoFriends !== "undefined"
                    ? onNoFriends
                    : () => console.error()
                }
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashFriends;
