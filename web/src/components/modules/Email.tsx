import Avatar from "@element/Avatar";
import { Email as EmailType } from "generated/graphql";
import { ForwardedRef, forwardRef } from "react";

interface EmailProps {
  data: EmailType;
  onClick: () => void;
}

const Email: React.FC<EmailProps> = forwardRef(
  ({ data, onClick }, ref: ForwardedRef<HTMLDivElement>) => {
    return (
      <div
        ref={ref}
        onClick={onClick}
        className="flex flex-col w-full p-4 rounded-lg transition duration-200 ease-in-out 
    bg-primary-700 hover:bg-primary-600 space-y-4 cursor-pointer relative"
      >
        <div className="flex justify-between">
          <div
            className="flex text-primary-100 font-bold 
        leading-5 truncate flex-grow"
          >
            {data.subject}
          </div>
          <div className="text-primary-200 font-bold ml-2 text-xs xs:text-sm whitespace-nowrap">
            {new Date(parseInt(data.createdAt)).toDateString()}
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <div className="h-10 absolute">
            <Avatar src={data.senderPhotoURL} />
          </div>
          <p
            className="pl-7 text-left break-all truncate whitespace-pre-wrap 
        line-clamp-1 text-primary-300"
          >
            {data.message}
          </p>
        </div>
      </div>
    );
  }
);

export default Email;
