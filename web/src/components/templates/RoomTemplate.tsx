interface RoomTemplateProps {
  Room: JSX.Element;
  Controls: JSX.Element;
  Chat: JSX.Element;
  showChat: boolean;
}

const RoomTemplate: React.FC<RoomTemplateProps> = ({
  Room,
  Controls,
  Chat,
  showChat,
}) => {
  return (
    <div className="h-screen w-screen flex flex-col bg-primary-900 text-white">
      <div className="h-full flex justify-evenly">
        <div className="h-controls flex-shrink">
          {Room}
          {Controls}
        </div>
        <div
          className="hidden 2xl:inline-block h-full 
        overflow-y-scroll scrollbar-hide"
        >
          {Chat}
        </div>
        <div
          className={`${
            !showChat && "hidden"
          } 2xl:hidden flex flex-col absolute bottom-20 right-0
          overflow-y-scroll scrollbar-hide h-full`}
        >
          {Chat}
        </div>
      </div>
    </div>
  );
};

export default RoomTemplate;
