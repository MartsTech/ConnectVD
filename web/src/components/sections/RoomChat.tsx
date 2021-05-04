import Message from "@element/Message";
import SendMessage from "@element/SendMessage";
import { messageType } from "@type/messageType";
import { MutableRefObject, useEffect, useRef } from "react";
import FlipMove from "react-flip-move";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";

interface RoomChatProps {
  socketRef: MutableRefObject<
    Socket<DefaultEventsMap, DefaultEventsMap> | undefined
  >;
  messages: messageType[];
  messageData: { photoURL: string; status: string };
}

const RoomChat: React.FC<RoomChatProps> = ({
  socketRef,
  messages,
  messageData,
}) => {
  const chatRef = useRef<HTMLDivElement>(null);

  return (
    <div className="w-full sm:w-80 pt-10 flex-grow max-h-auto bg-primary-800 flex flex-col items-center">
      <FlipMove className="space-y-4 w-full h-full pb-16">
        {messages.map((message, id) => (
          <Message key={`message_${id}`} data={message} />
        ))}
      </FlipMove>
      <div ref={chatRef} />

      <div className="sticky bottom-0 mx-auto w-72 z-10">
        <SendMessage
          socketRef={socketRef}
          messageData={messageData}
          chatRef={chatRef}
        />
        <div className="h-5 bg-primary-800"></div>
      </div>
    </div>
  );
};

export default RoomChat;
