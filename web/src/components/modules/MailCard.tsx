import mockMails from "mockMails";

interface MailCardProps {
  data: typeof mockMails[0];
}

const MailCard: React.FC<MailCardProps> = ({ data }) => {
  return (
    <div className="border border-gray-200 p-3 shadow-md">
      <h2 className="text-sm">{data.from}</h2>
      <h3>{data.subject}</h3>
    </div>
  );
};

export default MailCard;
