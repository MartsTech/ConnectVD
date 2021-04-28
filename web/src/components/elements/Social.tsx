import { IconType } from "@type/IconType";

interface SocialProps {
  url: string;
  Icon: IconType;
}

const Social: React.FC<SocialProps> = ({ url, Icon }) => {
  return (
    <div className="transition duration-100 transform hover:scale-110">
      <a href={url}>
        <Icon className="text-4xl" />
      </a>
    </div>
  );
};

export default Social;
