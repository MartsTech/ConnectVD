import {
  ChatIcon,
  ExternalLinkIcon,
  PhoneMissedCallIcon,
  UserAddIcon,
  VideoCameraIcon,
  VolumeUpIcon,
} from "@heroicons/react/solid";
import { useRouter } from "next/router";

interface RoomControlsProps {
  onChat: () => void;
}

const RoomControls: React.FC<RoomControlsProps> = ({ onChat }) => {
  const router = useRouter();

  return (
    <div className="h-20 flex items-center justify-evenly bg-primary-700">
      <div className="control">
        <UserAddIcon className="h-7 w-7" />
      </div>
      <div className="flex space-x-4">
        <div className="control">
          <VolumeUpIcon className="h-7 w-7" />
        </div>
        <div
          onClick={() => router.replace("/dash")}
          className="control control-important"
        >
          <PhoneMissedCallIcon className="h-7 w-7" />
        </div>
        <div className="control">
          <VideoCameraIcon className="h-7 w-7" />
        </div>
      </div>
      <div className="flex space-x-4">
        <div className="control">
          <ExternalLinkIcon className="h-7 w-7" />
        </div>
        <div onClick={onChat} className="control 2xl:hidden">
          <ChatIcon className="h-7 w-7" />
        </div>
      </div>
    </div>
  );
};

export default RoomControls;
