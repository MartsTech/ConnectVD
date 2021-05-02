import Image from "next/image";

interface LogoProps {
  onClick?: () => void;
  inHome?: boolean;
}

const Logo: React.FC<LogoProps> = ({ onClick, inHome = false }) => {
  return (
    <div
      onClick={onClick}
      className="flex items-center space-x-1 cursor-pointer"
    >
      <Image
        src="/favicon.ico"
        height="50px"
        width="50px"
        objectFit="contain"
        alt="Logo"
        className="z-10"
      />
      {!inHome && (
        <div className="bg-primary-100 w-9 h-5 rounded-full absolute"></div>
      )}
      <h1
        className={`hidden md:inline-block text-xl 
      xs:text-2xl font-mono ${!inHome && "text-primary-100"}`}
      >
        Connect<span className="text-secondary">VD</span>
      </h1>
    </div>
  );
};

export default Logo;
