import appInfo from "@service/appInfo";
import Image from "next/image";
import Badge from "./Badge";

interface AvatarProps {
  src?: string;
  size?: number;
  status?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  src = appInfo.defaultAvatar,
  status = "available",
  size = 1,
}) => {
  const width = 40 * size;
  const height = 40 * size;

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
