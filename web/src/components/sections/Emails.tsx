import Email from "@module/Email";

interface EmailsProps {}

const Emails: React.FC<EmailsProps> = ({}) => {
  const emails = [];
  for (let i = 0; i < 20; ++i) {
    emails.push("");
  }

  return (
    <div className="h-full flex flex-col space-y-4 overflow-y-scroll scrollbar-hide">
      {emails.map(() => (
        <Email />
      ))}
    </div>
  );
};

export default Emails;
