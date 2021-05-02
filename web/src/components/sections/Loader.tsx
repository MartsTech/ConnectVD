import Image from "next/image";

interface LoaderProps {}

const Loader: React.FC<LoaderProps> = ({}) => {
  return (
    <div className="h-screen flex items-center justify-center bg-primary-900">
      <div
        className="h-full xs:h-auto w-full xs:w-auto flex flex-col items-center
        bg-primary-100 py-28 px-12
      space-y-7"
      >
        <Image
          src="/images/logo.png"
          width={350}
          height={150}
          objectFit="contain"
          alt="Logo"
        />
        <div
          className="loader ease-linear rounded-full border-8 border-t-8 
        border-gray-200 h-40 w-40"
        ></div>
      </div>
    </div>
  );
};

export default Loader;
