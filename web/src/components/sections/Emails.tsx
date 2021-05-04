import Email from "@module/Email";
import { useRouter } from "next/router";
import FlipMove from "react-flip-move";
import Button from "@element/ImportantButton";
import { EmailsQuery } from "generated/graphql";
import { Email as EmailType } from "generated/graphql";

interface EmailsProps {
  emails?: EmailsQuery;
}

const Emails: React.FC<EmailsProps> = ({ emails }) => {
  const router = useRouter();

  return (
    <div className="h-full flex flex-col">
      <div
        className="flex items-center justify-between mb-5 mt-5
        sm:mt-0 ml-4"
      >
        <div className="text-primary-100 font-bold text-xl">Your Emails</div>
        <div className="mr-2">
          <Button
            title="Compose Email"
            onClick={() => router.push("/send-email")}
          />
        </div>
      </div>
      <FlipMove className="flex-grow flex flex-col space-y-3 overflow-y-scroll scrollbar-hide">
        {emails?.emails.emails.map((email) => (
          <Email
            key={email.id}
            data={email}
            onClick={() => router.push(`/email/${email.id}`)}
          />
        ))}
        {emails?.emails.emails.length === 0 && (
          <div
            className="text-primary-100 font-semibold text-lg text-center
            w-full px-4 py-6 rounded-lg transition duration-200 ease-in-out bg-primary-700
            hover:bg-primary-600 cursor-pointer"
          >
            You have no available emails
          </div>
        )}
      </FlipMove>
    </div>
  );
};

export default Emails;
