import { useEffect, useState } from "react";

interface DashMessageProps {}

const DashMessage: React.FC<DashMessageProps> = ({}) => {
  const [time, setTime] = useState("00:00:00 PM");

  useEffect(() => {
    const updateTime = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(updateTime);
  }, []);

  return (
    <div className="bg-primary-700 text-primary-100 rounded-md sm:p-5">
      <div className="flex flex-col sm:space-y-5 items-center">
        <h2 className="text-4xl sm:text-5xl font-mono">{time}</h2>
        <h2 className="text-2xl sm:text-3xl font-mono">
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
