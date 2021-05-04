import { auth } from "@config/firebase";
import { useSnackbar } from "notistack";
import { MailData } from "@type/emailData";
import { useFriendsQuery, useSendEmailMutation } from "generated/graphql";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Formik, Form, Field } from "formik";
import Button from "@element/Button";
import FriendsInput from "@module/FriendsInput";

interface SendEmailProps {}

const SendEmail: React.FC<SendEmailProps> = ({}) => {
  const [user, loading] = useAuthState(auth);
  const [FriendsData] = useFriendsQuery({
    pause: loading,
    variables: { uid: user?.uid as string },
  });

  const router = useRouter();

  const [receiver, setReceiver] = useState("");

  useEffect(() => {
    setReceiver(router.query.email as string);
  }, [router.query.email]);

  const [, sendEmail] = useSendEmailMutation();

  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async (input: { subject: string; message: string }) => {
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(receiver)) {
      return;
    }

    const options: MailData = {
      to: receiver,
      subject: input.subject,
      message: input.message,
    };

    const email = await sendEmail({ uid: user?.uid as string, options });

    if (email.data?.sendEmail.error) {
      alert(email.data?.sendEmail.error);
    } else if (email.data?.sendEmail.email) {
      enqueueSnackbar("Email successfully sent", {
        variant: "success",
        autoHideDuration: 3000,
      });
      router.push("emails");
    }
  };

  return (
    <Formik
      initialValues={{ subject: "", message: "" }}
      validate={(values) => {
        const errors: any = {};

        if (!values.subject) {
          errors.subject = "Required";
        } else if (values.subject.length > 100) {
          errors.lastName = "Must be 100 characters or less";
        }

        if (!values.message) {
          errors.message = "Required";
        }

        return errors;
      }}
      onSubmit={(values) => {
        onSubmit(values);
      }}
    >
      {({}) => (
        <Form
          className="flex-grow flex flex-col bg-primary-700 rounded-lg
        overflow-y-scroll scrollbar-hide"
        >
          <div
            className="flex items-center justify-between p-4 rounded-t-8 w-full 
      border-b border-primary-600 sticky top-0 z-10 bg-primary-700"
          >
            <p className="text-primary-100 text-xl font-bold">Send Email</p>
            <Button primary title="Send Email" type="submit" />
          </div>

          <div className="flex flex-col">
            <label htmlFor="to" className="flex p-4 mx-6 text-primary-100">
              Email
            </label>
            <FriendsInput
              data={FriendsData.data}
              receiver={receiver}
              setReceiver={setReceiver}
              name="to"
            />

            <label htmlFor="subject" className="flex p-4 mx-6 text-primary-100">
              Subject
            </label>
            <Field
              className="flex-grow py-3 px-4 mx-10 rounded-8 text-primary-100 
          focus:outline-none bg-primary-600 rounded-lg"
              name="subject"
              type="text"
            />

            <label htmlFor="message" className="flex p-4 mx-6 text-primary-100">
              Message
            </label>
            <Field
              className="flex-grow py-3 px-4 mx-10 rounded-8 text-primary-100 pb-10
          focus:outline-none bg-primary-600 rounded-lg h-32 xs:h-60"
              name="message"
              as="textarea"
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SendEmail;
