import { ForwardedRef, forwardRef } from "react";
import Avatar from "./Avatar";

interface VideoCoverProps {
  video: boolean;
}

const VideoCover: React.FC<VideoCoverProps> = forwardRef(
  ({ video, children }, ref: ForwardedRef<HTMLDivElement>) => {
    return (
      <div ref={ref} className="rounded-md relative">
        {!video && (
          <div
            className="absolute h-full w-full flex flex-col 
    bg-primary-700 items-center justify-center "
          >
            <Avatar size={3} />
          </div>
        )}
        <div className="bg-opacity-0">{children}</div>
      </div>
    );
  }
);

export default VideoCover;
