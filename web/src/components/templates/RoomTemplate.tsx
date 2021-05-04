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
    <div className="h-screen w-screen bg-primary-900 text-primary-100">
      <div className="h-full w-full flex justify-evenly">
        <div className="h-full flex flex-col">
          {Room}
          {Controls}
        </div>
        <div
          className="hidden 2xl:flex flex-col
          overflow-y-scroll scrollbar-hide h-full"
        >
          {Chat}
        </div>
        <div
          className={`${
            showChat ? "w-full sm:w-auto" : "hidden"
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
