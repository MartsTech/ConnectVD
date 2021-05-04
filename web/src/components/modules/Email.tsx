import Avatar from "@element/Avatar";

interface EmailProps {}

const Email: React.FC<EmailProps> = ({}) => {
  return (
    <div
      className="flex flex-col w-full p-4 rounded-lg transition duration-200 ease-in-out 
    bg-primary-700 hover:bg-primary-600 space-y-2 cursor-pointer"
    >
      <div className="flex justify-between">
        <div
          className="flex text-primary-100 font-bold 
        leading-5 truncate w-[90%]"
        >
          Taking voice conversations to the moon 🚀
        </div>
        <div className="text-primary-200 font-bold">Sun Mar</div>
      </div>

      <div className="flex items-center space-x-6">
        <div className="h-10">
          <Avatar />
        </div>
        <p
          className="text-left break-all truncate whitespace-pre-wrap 
        line-clamp-1 text-primary-300"
        >
          DogeHouse is open to contributions, but I recommend creating an issue.
        </p>
      </div>
    </div>
  );
};

export default Email;
