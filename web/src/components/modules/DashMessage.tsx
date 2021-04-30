import { useState } from "react";

interface DashMessageProps {}

const DashMessage: React.FC<DashMessageProps> = ({}) => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  const updateTime = () => {
    setTime(new Date().toLocaleTimeString());
  };

  setInterval(updateTime, 1000);

  return (
    <div
      className="flex flex-col items-center p-5 
    border border-gray-200 shadow-lg bg-gray-800 text-white"
    >
      <h1 className="text-5xl font-mono mx-auto hidden sm:inline-block ">
        Welcome to Connect<span className="text-[#3f51b5]">VD</span>
      </h1>
      <div className="flex flex-col space-y-2 pt-10">
        <h2 className="text-4xl font-mono">{time}</h2>
        <h2 className="text-2xl font-mono">
          {new Intl.DateTimeFormat("en-GB", {
            year: "numeric",
            month: "long",
            day: "2-digit",
          }).format(new Date())}
        </h2>
      </div>
    </div>
  );
};

export default DashMessage;
