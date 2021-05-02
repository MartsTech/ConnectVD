import Image from "next/image";
import Badge from "./Badge";

interface AvatarProps {
  src?: string;
  size?: number;
  className?: string;
  status?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  className = "h-[40px] w-[40px]",
  children = "U",
  status = "available",
  size = 1,
}) => {
  const width = 40 * size;
  const height = 40 * size;

  if (typeof src === "undefined") {
    return (
      <div
        className={`bg-primary-300 rounded-full flex items-center justify-center 
       text-2xl text-primary-100 relative ${className}`}
      >
        {children}
        <Badge className=" absolute" status={status as any} />
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
      <Badge status={status as any} size={size} className="absolute" />
    </div>
  );
};

export default Avatar;
