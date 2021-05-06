import Modal from "@element/Model";
import Button from "@element/Button";
import { useRef, useState } from "react";
import { useRouter } from "next/router";
import FriendsInput from "@module/FriendsInput";
import { FriendsQuery } from "generated/graphql";

interface RoomInviteProps {
  open: boolean;
  onClose: () => void;
  data?: FriendsQuery;
  onInvite: (email: string) => Promise<void>;
}

const RoomInvite: React.FC<RoomInviteProps> = ({
  open,
  onClose,
  data,
  onInvite,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [copied, setCopied] = useState(false);

  const [receiver, setReceiver] = useState("");

  const router = useRouter();
  const id = router.query.id as string;

  let buttonText = "Copy";

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (navigator.share) {
    buttonText = "Copy Link";
  } else if (copied) {
    buttonText = "Copied";
  }

  const copyURL = () => {
    if (navigator.share) {
      navigator.share({ url: id });
    } else {
      inputRef.current?.select();
      document.execCommand("copy");
      setCopied(true);
    }
  };

  return (
    <Modal isOpen={open} onRequestClose={onClose}>
      <div className="flex-grow flex flex-col pt-5 pb-10">
        <div
          className="flex items-center justify-between md:p-4 rounded-t-8 w-full 
    border-b border-primary-600 sticky top-0 z-10 bg-primary-700 text-left h-10"
        >
          <p className="text-primary-100 text-lg sm:text-xl font-bold">
            Invite
          </p>
        </div>

        <h3 className="flex p-4 text-primary-100">Invite Friend</h3>
        <div className="flex flex-col space-y-5">
          <FriendsInput
            data={data}
            receiver={receiver}
            setReceiver={setReceiver}
            name="receiver"
          />
          <Button
            primary
            title="Invite Friend"
            onClick={() => onInvite(receiver)}
          />
        </div>

        <div className="flex flex-col">
          <h3 className="flex p-4 text-primary-100">URL</h3>
          <input
            readOnly
            value={id}
            className="py-3 px-4 rounded-8 text-primary-100 
        focus:outline-none bg-primary-600 rounded-lg mb-5"
          />
          <Button primary title={buttonText} onClick={() => copyURL()} />
        </div>
      </div>
    </Modal>
  );
};

export default RoomInvite;
