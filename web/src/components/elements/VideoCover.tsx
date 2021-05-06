import { ForwardedRef, forwardRef } from "react";
import Avatar from "./Avatar";

interface VideoCoverProps {
  video: boolean;
  src?: string;
  status?: string;
}

const VideoCover: React.FC<VideoCoverProps> = forwardRef(
  ({ video, src, status, children }, ref: ForwardedRef<HTMLDivElement>) => {
    return (
      <div ref={ref} className="rounded-md relative">
        {!video && (
          <div
            className="absolute h-full w-full flex flex-col 
    bg-primary-700 items-center justify-center "
          >
            <Avatar src={src} status={status} size={3} />
          </div>
        )}
        <div className="bg-opacity-0">{children}</div>
      </div>
    );
  }
);

export default VideoCover;
