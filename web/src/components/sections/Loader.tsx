import Image from "next/image";

interface LoaderProps {}

const Loader: React.FC<LoaderProps> = ({}) => {
  return (
    <div className="h-screen flex items-center justify-center bg-primary-900">
      <div
        className="h-full xs:h-auto w-full xs:w-auto flex flex-col items-center
        bg-primary-700 py-28 px-12
      space-y-7"
      >
        <div className="flex items-center space-x-1 cursor-pointer">
          <Image
            src="/favicon.ico"
            height={120}
            width={120}
            objectFit="contain"
            alt="Logo"
            className="z-10"
          />
          <h1 className={`text-4xl sm:text-5xl font-mono text-primary-100`}>
            Connect<span className="text-secondary">VD</span>
          </h1>
        </div>
        <div
          className="loader ease-linear rounded-full border-8 border-t-8 
        border-gray-200 h-40 w-40"
        ></div>
      </div>
    </div>
  );
};

export default Loader;
