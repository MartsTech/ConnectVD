import Image from "next/image";

interface SocialProps {
  url: string;
  src: string;
}

const Social: React.FC<SocialProps> = ({ url, src }) => {
  return (
    <div className="transition duration-100 transform hover:scale-110">
      <a href={url}>
        <Image src={src} height={40} width={40} />
      </a>
    </div>
  );
};

export default Social;
