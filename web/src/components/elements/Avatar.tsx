import Image from "next/image";
import Badge from "./Badge";

interface AvatarProps {
  src?: string;
  height?: number;
  width?: number;
  className?: string;
  status?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  height = 40,
  width = 40,
  className = "h-[40px] w-[40px]",
  children = "U",
  status = "available",
}) => {
  if (typeof src === "undefined") {
    return (
      <div
        className={`bg-gray-300 rounded-full flex items-center justify-center 
       text-2xl text-white ${className}`}
      >
        {children}
      </div>
    );
  }

  return (
    <div className="relative">
      <Image
        className="rounded-full"
        objectFit="contain"
        src={src}
        height={height as number}
        width={width as number}
      />
      <Badge status={status as any} />
    </div>
  );
};

export default Avatar;
