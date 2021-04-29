import { dashFuncType } from "@type/dashFuncType";

interface DashFuncProps {
  info: dashFuncType;
}

const DashFunc: React.FC<DashFuncProps> = ({
  info: { title, color, Icon },
}) => {
  const cssColor = color === "red" ? "bg-red-600" : "bg-[#3f51b5]";

  return (
    <div className="py-5 mx-auto">
      <div
        className={`rounded-full h-24 w-[250px] flex items-center justify-center 
        text-white ${cssColor}`}
      >
        <Icon className={"h-16 w-16"} />
        <h3 className="text-2xl font-medium ml-4">{title}</h3>
      </div>
    </div>
  );
};

export default DashFunc;
