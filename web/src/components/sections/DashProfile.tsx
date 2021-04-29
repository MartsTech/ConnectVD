import Avatar from "@element/Avatar";
import MailCard from "@module/MailCard";
import { MeQuery } from "generated/graphql";
import mockMails from "mockMails";

interface DashProfileProps {
  data?: MeQuery;
}

const DashProfile: React.FC<DashProfileProps> = ({ data }) => {
  return (
    <div
      className="space-y-5 h-full max-w-xs overflow-y-scroll scrollbar-hide 
    bg-white"
    >
      <div
        className="flex flex-col space-y-1 border border-gray-100 
        shadow-lg py-7 px-14 items-center sticky z-10 top-0 bg-white"
      >
        <Avatar src={data?.me?.photoUrl} size={2} status={data?.me?.status} />
        <h2 className="text-2xl font-medium text-gray-600">
          {data?.me?.displayName}
        </h2>
        <h5 className="text-lg">{data?.me?.email}</h5>
      </div>
      <div className="flex flex-col space-y-1 shadow-lg px-2">
        <h4 className="text-xl font-semibold text-gray-600 underline">
          Latest Mails
        </h4>
        {mockMails.map((mail) => (
          <MailCard data={mail} />
        ))}
      </div>
    </div>
  );
};

export default DashProfile;
