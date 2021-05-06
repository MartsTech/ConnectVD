import Avatar from "@element/Avatar";
import { Email } from "generated/graphql";

interface EmailViewProps {
  email?: Email;
}

const EmailView: React.FC<EmailViewProps> = ({ email }) => {
  return (
    <div
      className="flex-grow flex flex-col pb-20 bg-primary-700 rounded-lg
    relative overflow-y-scroll scrollbar-hide"
    >
      <div className="sticky top-0 z-10 bg-primary-700">
        <div
          className="flex p-4 bg-primary-700 rounded-t-8 
      border-b border-primary-600 w-full cursor-pointer text-primary-100"
        >
          <div className="absolute">
            <Avatar src={email?.senderPhotoURL} size={1.5} />
          </div>
          <div
            className="pl-20 flex text-xl font-bold flex-1 text-left break-all truncate
          whitespace-pre-wrap line-clamp-2 h-14"
          >
            {email?.subject}
          </div>
        </div>
        <div
          className="flex text-primary-200 p-4 border-b 
      border-primary-600 justify-between items-center"
        >
          <p className="truncate mr-5">
            <span className="text-primary-100 mr-2">from:</span>
            {email?.senderEmail}
          </p>
          <p className="text-sm whitespace-nowrap">Sun Mar 07 2021</p>
        </div>
      </div>

      <div className="text-primary-100 mx-4 text-justify">{email?.message}</div>
    </div>
  );
};

export default EmailView;
