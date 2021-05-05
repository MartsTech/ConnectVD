import Avatar from "@element/Avatar";
import { User } from "generated/graphql";
import { ForwardedRef, forwardRef } from "react";
import Button from "@element/Button";

interface InviteProps {
  data?: User;
  time: string;
  type: "friend request" | "join meeting";
  onAccept: () => void;
  onDecline: () => void;
}

const Invite: React.FC<InviteProps> = forwardRef(
  (
    { data, time, type, onAccept, onDecline },
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <div
        ref={ref}
        className="flex flex-col w-full p-4 rounded-lg transition duration-200 ease-in-out 
bg-primary-700 space-y-5 cursor-pointer relative"
      >
        <div className="flex justify-between">
          <div
            className="flex text-primary-100 font-bold 
  leading-5 truncate flex-grow"
          >
            {data?.displayName}
          </div>
          <div className="text-primary-200 font-bold ml-2 text-xs xs:text-sm whitespace-nowrap">
            {new Date(parseInt(time)).toDateString()}
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <div className="h-10 absolute">
            <Avatar src={data?.photoUrl} status={status} />
          </div>
          <p
            className="pl-7 text-left break-all truncate whitespace-pre-wrap 
  line-clamp-1 text-primary-300"
          >
            {type === "friend request"
              ? `${data?.displayName} send you a Friend Request`
              : `${data?.displayName} send you a Join Meeting Invite`}
          </p>
        </div>
        <div className="flex space-x-5">
          <Button primary title="Accept" onClick={onAccept} />
          <Button secondary title="Decline" onClick={onDecline} />
        </div>
      </div>
    );
  }
);

export default Invite;
