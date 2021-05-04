import {
  ChatIcon,
  ExternalLinkIcon,
  PhoneMissedCallIcon,
  UserAddIcon,
  VideoCameraIcon,
  VolumeUpIcon,
} from "@heroicons/react/solid";

interface RoomControlsProps {
  onChat: () => void;
  onLeave: () => void;
  onScreen: () => void;
  onVideo: () => void;
  video: boolean;
  onAudio: () => void;
  audio: boolean;
}

const RoomControls: React.FC<RoomControlsProps> = ({
  onChat,
  onLeave,
  onScreen,
  onVideo,
  video,
  onAudio,
  audio,
}) => {
  return (
    <div className="xs:h-20 grid xs:flex items-center justify-evenly bg-primary-700">
      <div className="flex space-x-4 py-2 xs:py-0">
        <div
          onClick={onAudio}
          className={`control ${!audio && "control-important"}`}
        >
          <VolumeUpIcon className="h-7 w-7" />
        </div>
        <div onClick={onLeave} className="control control-important">
          <PhoneMissedCallIcon className="h-7 w-7" />
        </div>
        <div
          onClick={onVideo}
          className={`control ${!video && "control-important"}`}
        >
          <VideoCameraIcon className="h-7 w-7" />
        </div>
      </div>
      <div className="flex space-x-4 py-2 xs:py-0">
        <div className="control">
          <UserAddIcon className="h-7 w-7" />
        </div>
        <div onClick={onScreen} className="control">
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
