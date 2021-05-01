interface SendMessageProps {
  className?: string;
}

const SendMessage: React.FC<SendMessageProps> = ({ className }) => {
  return (
    <div
      className={`flex flex-1 lg:mr-0 items-center bg-[#242c37] rounded-8 ${className}`}
    >
      <input
        placeholder="Send a Message"
        className="w-full py-2 px-4 rounded-md text-primary-[#dee3ea] 
        placeholder-primary-[#5d7290] focus:outline-none bg-transparent"
      />
    </div>
  );
};

export default SendMessage;
