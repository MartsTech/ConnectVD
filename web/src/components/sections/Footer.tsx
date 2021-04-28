import ToTopButton from "@element/ToTopButton";
import Social from "@element/Social";
import appInfo from "@service/appInfo";
import socialData from "@service/socialData";

interface FooterProps {}

const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <footer className="relative bg-[#303030] text-white">
      <ToTopButton />
      <div className="flex flex-col items-center py-10 space-y-3">
        <h1 className="text-3xl font-semibold">{appInfo.title}</h1>
        <h3 className="text-lg font-medium">{appInfo.slogan}</h3>
        <div className="flex space-x-4">
          {socialData.map(({ name, url, Icon }) => (
            <Social key={name} url={url} Icon={Icon} />
          ))}
        </div>
        <p className="tracking-wide">
          Copyright &copy;2021 ConnectVD. Made by{" "}
          <span className="text-gray-400">Martin Velkov</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
