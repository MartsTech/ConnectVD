import { auth } from "@config/firebase";
import { useSnackbar } from "notistack";
import { MailData } from "@type/emailData";
import { useFriendsQuery, useSendEmailMutation } from "generated/graphql";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import Button from "@element/ImportantButton";
import FriendsInput from "@module/FriendsInput";

interface SendEmailProps {}

const SendEmail: React.FC<SendEmailProps> = ({}) => {
  const [user, loading] = useAuthState(auth);
  const [FriendsData] = useFriendsQuery({
    pause: loading,
    variables: { uid: user?.uid as string },
  });

  const [receiver, setReceiver] = useState("");

  const [, sendEmail] = useSendEmailMutation();

  const router = useRouter();

  const { register, handleSubmit, setError } = useForm<MailData>();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async (input: MailData) => {
    if (receiver === "") {
      setError("to", { message: "Please enter an email" });
      return;
    }

    const options: MailData = {
      to: receiver,
      subject: input.subject,
      message: input.message,
    };

    const email = await sendEmail({ uid: user?.uid as string, options });

    if (email.data?.sendEmail.error) {
      setError("to", { message: email.data.sendEmail.error.message });
    } else if (email.data?.sendEmail.email) {
      enqueueSnackbar("Email successfully sent", {
        variant: "success",
        autoHideDuration: 3000,
      });
    }
    router.push("emails");
  };

  return (
    <div
      className="flex-grow flex flex-col bg-primary-700 rounded-lg
      overflow-y-scroll scrollbar-hide"
    >
      <div
        className="flex items-center justify-between p-4 rounded-t-8 w-full 
      border-b border-primary-600 sticky top-0 z-10 bg-primary-700"
      >
        <p className="text-primary-100 text-xl font-bold">Send Email</p>
        <Button title="Send Email" onClick={() => alert("TOdo")} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <h3 className="flex p-4 mx-6 text-primary-100">Email</h3>
        <FriendsInput
          data={FriendsData.data}
          receiver={receiver}
          setReceiver={setReceiver}
        />
        {/* <input
          className="flex-grow py-3 px-4 mx-10 rounded-8 text-primary-100 
          focus:outline-none bg-primary-600 rounded-lg"
          name="receiver"
          type="email"
        /> */}
        <h3 className="flex p-4 mx-6 text-primary-100">Subject</h3>
        <input
          className="flex-grow py-3 px-4 mx-10 rounded-8 text-primary-100 
          focus:outline-none bg-primary-600 rounded-lg"
          name="subject"
          type="text"
        />
        <h3 className="flex p-4 mx-6 text-primary-100">Message</h3>
        <textarea
          className="flex-grow py-3 px-4 mx-10 rounded-8 text-primary-100 pb-10
          focus:outline-none bg-primary-600 rounded-lg h-32 xs:h-60"
          name="subject"
        />
      </form>
    </div>
  );
};

export default SendEmail;
