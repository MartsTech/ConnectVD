import { IconType } from "@type/IconType";

interface SectionLabelProps {
  Icon: IconType;
  title: string;
}

const SectionLabel: React.FC<SectionLabelProps> = ({ Icon, title }) => {
  return (
    <div
      className="text-center flex items-center bg-[#3f51b5] 
          text-white p-2 sticky z-20 top-0"
    >
      <Icon className="h-6 w-6 ml-2" />
      <p className="text-md font-medium ml-2">{title}</p>
    </div>
  );
};

export default SectionLabel;
