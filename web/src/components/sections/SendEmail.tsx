import Button from "@element/ImportantButton";

interface SendEmailProps {}

const SendEmail: React.FC<SendEmailProps> = ({}) => {
  return (
    <div
      className="flex-grow flex flex-col pb-20 bg-primary-700 rounded-lg
      overflow-y-scroll scrollbar-hide"
    >
      <div
        className="flex items-center justify-between p-4 rounded-t-8 w-full 
      border-b border-primary-600 sticky top-0 z-10 bg-primary-700"
      >
        <p className="text-primary-100 text-xl font-bold">Send Email</p>
        <Button title="Send Email" onClick={() => alert("TOdo")} />
      </div>
      <div className="flex flex-col">
        <h3 className="flex p-4 mx-6 text-primary-100">Email</h3>
        <input
          className="flex-grow py-3 px-4 mx-10 rounded-8 text-primary-100 
          focus:outline-none bg-primary-600 rounded-lg"
          name="receiver"
          type="email"
        />
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
          focus:outline-none bg-primary-600 rounded-lg h-60"
          name="subject"
        />
      </div>
    </div>
  );
};

export default SendEmail;
