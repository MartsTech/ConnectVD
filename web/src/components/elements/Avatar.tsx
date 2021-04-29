import Image from "next/image";

interface AvatarProps {
  src?: string;
  height?: number;
  width?: number;
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  height = 40,
  width = 40,
  className = "h-[40px] w-[40px]",
  children = "U",
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
    <Image
      className="rounded-full"
      objectFit="contain"
      src={src}
      height={height as number}
      width={width as number}
    />
  );
};

export default Avatar;
