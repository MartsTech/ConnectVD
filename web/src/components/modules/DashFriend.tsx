import Avatar from "@element/Avatar";
import PreviewCard from "@element/PreviewCard";
import Profile from "@element/Profile";
import friendExtendOptions from "@service/friendExtendOptions";
import { MeQuery } from "generated/graphql";
import { useState } from "react";

interface DashFriendProps {
  info: MeQuery;
}

const DashFriend: React.FC<DashFriendProps> = ({ info }) => {
  const [extend, setExtend] = useState(false);

  return (
    <div className="">
      <PreviewCard
        Icon={<Avatar src={info.me?.photoUrl} status={info.me?.status} />}
        title={info.me?.displayName || ""}
        onClick={() => setExtend(!extend)}
      />
      {extend && (
        <div className="shadow-lg">
          <Profile data={info} />

          {friendExtendOptions.map(({ Icon, title, onClick }) => (
            <PreviewCard
              Icon={<Icon className="h-7 w-7 text-gray-500" />}
              title={title}
              onClick={onClick}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DashFriend;
