import Image from "next/image";

interface HomeFeatureProps {
  title: string;
  desc: string;
  reverse: boolean;
}

const HomeFeature: React.FC<HomeFeatureProps> = ({ title, desc, reverse }) => {
  return (
    <div
      className={`flex flex-col justify-evenly items-center py-5 shadow-lg ${
        reverse ? "md:flex-row-reverse" : "md:flex-row"
      }`}
      id={title}
    >
      <div className="w-5/6 md:w-2/5 xs:w-full">
        <h1 className="capitalize text-4xl font-medium p-3">{title}</h1>
        <p className="text-xl pl-3">{desc}</p>
      </div>
      <Image
        className="object-contain"
        src={`/images/${title}.jpg`}
        height={300}
        width={450}
      />
    </div>
  );
};

export default HomeFeature;
