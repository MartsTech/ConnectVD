import { messageType } from "@type/messageType";
import { MouseEvent, MutableRefObject, RefObject, useRef } from "react";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";

interface SendMessageProps {
  socketRef: MutableRefObject<
    Socket<DefaultEventsMap, DefaultEventsMap> | undefined
  >;
  messageData: {
    photoURL: string;
    status: string;
  };
  chatRef: RefObject<HTMLDivElement>;
}

const SendMessage: React.FC<SendMessageProps> = ({
  socketRef,
  messageData,
  chatRef,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const sendMessage = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();

    if (!inputRef.current) {
      return;
    }

    const value = inputRef.current.value;

    if (!value && value === "") {
      return;
    }
    const message: messageType = {
      photoURL: messageData.photoURL,
      status: messageData.status,
      value,
    };
    socketRef.current?.emit("chat message", message);

    chatRef.current?.scrollIntoView({
      behavior: "smooth",
    });

    inputRef.current.value = "";
  };

  return (
    <form
      className={"lex flex-1 lg:mr-0 items-center bg-primary-700 rounded-8 "}
    >
      <input
        ref={inputRef}
        placeholder="Send a Message"
        className="w-full py-2 px-4 rounded-md text-primary-100 flex-autofocus:outline-none bg-transparent"
      />
      <button hidden type="submit" onClick={sendMessage}>
        Send
      </button>
    </form>
  );
};

export default SendMessage;
