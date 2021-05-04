import Avatar from "@element/Avatar";
import PreviewCard from "@element/PreviewCard";
import Profile from "@element/Profile";
import friendExtendOptions from "@service/friendExtendOptions";
import { User } from "generated/graphql";
import { ForwardedRef, forwardRef, useState } from "react";

interface DashFriendProps {
  info: User;
}

const DashFriend: React.FC<DashFriendProps> = forwardRef(
  ({ info }, ref: ForwardedRef<HTMLDivElement>) => {
    const [extend, setExtend] = useState(false);

    return (
      <div ref={ref}>
        <PreviewCard
          Icon={<Avatar src={info.photoUrl} status={info.status} />}
          title={info.displayName}
          onClick={() => setExtend(!extend)}
        />
        {extend && (
          <div>
            <Profile data={info} important />
            {friendExtendOptions.map(({ Icon, title, onClick }) => (
              <PreviewCard
                Icon={<Icon className="h-7 w-7 text-primary-200" />}
                title={title}
                onClick={onClick}
                important
              />
            ))}
          </div>
        )}
      </div>
    );
  }
);

export default DashFriend;
