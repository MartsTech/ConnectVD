import { dashFuncType } from "@type/dashFuncType";

interface DashFuncProps {
  info: dashFuncType;
  onClick: () => void;
}

const DashFunc: React.FC<DashFuncProps> = ({
  info: { title, color, Icon },
  onClick,
}) => {
  const cssColor = color === "red" ? "bg-red-600" : "bg-[#3f51b5]";

  return (
    <div
      className="py-5 mx-auto cursor-pointer hover:scale-110"
      onClick={onClick}
    >
      <div
        className={`rounded-full h-16 sm:h-24 w-60 flex items-center justify-center 
        text-white ${cssColor}`}
      >
        <Icon className="h-12 w-12" />
        <h3 className="text-2xl font-medium ml-4">{title}</h3>
      </div>
    </div>
  );
};

export default DashFunc;
