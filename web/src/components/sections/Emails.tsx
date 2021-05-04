import Email from "@module/Email";
import { useRouter } from "next/router";
import FlipMove from "react-flip-move";

interface EmailsProps {}

const Emails: React.FC<EmailsProps> = ({}) => {
  const router = useRouter();

  const emails = [];
  for (let i = 0; i < 20; ++i) {
    emails.push("");
  }

  return (
    <FlipMove className="h-full flex flex-col space-y-5 overflow-y-scroll scrollbar-hide">
      {emails.map(() => (
        <Email onClick={() => router.push("/email/123")} />
      ))}
    </FlipMove>
  );
};

export default Emails;
