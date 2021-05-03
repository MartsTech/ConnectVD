import { ForwardedRef, forwardRef } from "react";
import Avatar from "./Avatar";

interface VideoCoverProps {}
const VideoCover: React.FC<VideoCoverProps> = forwardRef(
  ({ children }, ref: ForwardedRef<HTMLDivElement>) => {
    return (
      <div ref={ref} className="">
        <div
          className="flex flex-col items-center justify-center bg-primary-700 
        rounded-md"
        >
          <div className="absolute">
            <Avatar size={3} />
          </div>
          <div className="z-10">{children}</div>
        </div>
      </div>
    );
  }
);

export default VideoCover;
