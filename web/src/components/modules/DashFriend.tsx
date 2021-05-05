import Avatar from "@element/Avatar";
import PreviewCard from "@element/PreviewCard";
import Profile from "@element/Profile";
import { MailIcon, UserRemoveIcon } from "@heroicons/react/solid";
import { User } from "generated/graphql";
import { useRouter } from "next/router";
import { ForwardedRef, forwardRef, useState } from "react";

interface DashFriendProps {
  info: User;
  onUnfriend?: (email: string) => void;
}

const DashFriend: React.FC<DashFriendProps> = forwardRef(
  ({ info, onUnfriend }, ref: ForwardedRef<HTMLDivElement>) => {
    const [extend, setExtend] = useState(false);

    const router = useRouter();

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
            <PreviewCard
              Icon={<MailIcon className="h-7 w-7 text-primary-200" />}
              title="Contact"
              onClick={() => router.push(`/send-email?email=${info.email}`)}
              important
            />
            <PreviewCard
              Icon={<UserRemoveIcon className="h-7 w-7 text-primary-200" />}
              title="Unfriend"
              onClick={() => (onUnfriend ? onUnfriend(info.email) : undefined)}
              important
            />
          </div>
        )}
      </div>
    );
  }
);

export default DashFriend;
