import { messageType } from "@type/messageType";
import { ForwardedRef, forwardRef } from "react";
import Avatar from "./Avatar";

interface MessageProps {
  data: messageType;
}

const Message: React.FC<MessageProps> = forwardRef(
  ({ data }, ref: ForwardedRef<HTMLDivElement>) => {
    return (
      <div ref={ref} className="flex space-x-2 w-full px-5">
        <div className="">
          <Avatar src={data.photoURL} status={data.status} />
        </div>

        <p className="flex-grow max-w-[240px] break-words">{data.value}</p>
      </div>
    );
  }
);

export default Message;
