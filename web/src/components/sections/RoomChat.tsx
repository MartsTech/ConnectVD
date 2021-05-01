import Message from "@element/Message";
import SendMessage from "@element/SendMessage";
import { MeQuery } from "generated/graphql";
import FlipMove from "react-flip-move";

interface RoomChatProps {
  messages: MeQuery[];
}

const RoomChat: React.FC<RoomChatProps> = ({ messages }) => {
  return (
    <div
      className="h-full w-80 bg-[#151a21] flex flex-col items-center 
    overflow-y-scroll scrollbar-hide"
    >
      <FlipMove className="space-y-4 w-full">
        {messages.map((message, id) => (
          <Message key={`message_${id}`} data={message} />
        ))}
      </FlipMove>
      <div className="sticky bottom-0 mx-auto w-72 z-10">
        <SendMessage />
        <div className="w-80 h-5 bg-[#151a21]"></div>
      </div>
    </div>
  );
};

export default RoomChat;
