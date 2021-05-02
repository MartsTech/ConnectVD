import Message from "@element/Message";
import SendMessage from "@element/SendMessage";
import { MeQuery } from "generated/graphql";

interface RoomChatProps {
  messages: MeQuery[];
}

const RoomChat: React.FC<RoomChatProps> = ({ messages }) => {
  return (
    <div className="w-80 bg-primary-800 flex flex-col items-center">
      <div className="space-y-4 w-full">
        {messages.map((message, id) => (
          <Message key={`message_${id}`} data={message} />
        ))}
      </div>
      <div className="sticky bottom-0 mx-auto w-72 z-10">
        <SendMessage />
        <div className="w-80 h-5 bg-primary-800"></div>
      </div>
    </div>
  );
};

export default RoomChat;
