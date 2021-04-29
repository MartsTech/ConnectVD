import Image from "next/image";

interface LogoProps {
  onClick?: () => void;
}

const Logo: React.FC<LogoProps> = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex items-center space-x-1 cursor-pointer"
    >
      <Image
        src="/favicon.ico"
        height="50px"
        width="50px"
        className="object-contain"
        alt="Logo"
      />
      <h1 className="inline-block md:inline-block xs:hidden text-xl xs:text-2xl font-mono">
        Connect<span className="text-[#3f51b5]">VD</span>
      </h1>
    </div>
  );
};

export default Logo;
