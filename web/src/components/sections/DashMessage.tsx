interface DashMessageProps {}

const DashMessage: React.FC<DashMessageProps> = ({}) => {
  return (
    <div className="flex flex-col items-center space-y-5">
      <h1 className="text-5xl font-mono mx-auto">
        Welcome to Connect<span className="text-[#3f51b5]">VD</span>
      </h1>
      <h3 className="text-2xl font-medium text-gray-600">
        Since you've last logged in you received:
      </h3>
      <div className="space-y-5">
        <h5 className="text-xl">
          Video Calls: <span>32</span>
        </h5>
        <h5 className="text-xl">
          Friend Requests: <span>42</span>
        </h5>
        <h5 className="text-xl">
          Mails: <span>32</span>
        </h5>
      </div>
    </div>
  );
};

export default DashMessage;
