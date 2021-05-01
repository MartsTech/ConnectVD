import Room from "@section/Room";
import RoomControls from "@section/RoomControls";
import { useState } from "react";

interface RoomTemplateProps {
  Chat: JSX.Element;
}

const RoomTemplate: React.FC<RoomTemplateProps> = ({ Chat }) => {
  const [chat, setChat] = useState(false);

  return (
    <div className="h-screen w-screen flex flex-col bg-[#0b0e11] text-white">
      <div className="h-full flex justify-evenly">
        <div className="h-controls flex-shrink">
          <Room />
          <RoomControls onChat={() => setChat(!chat)} />
        </div>
        <div className="hidden 2xl:inline-block h-full">{Chat}</div>
        <div
          className={`${
            !chat && "hidden"
          } 2xl:hidden flex flex-col absolute bottom-20 right-0`}
        >
          {Chat}
        </div>
      </div>
    </div>
  );
};

export default RoomTemplate;
