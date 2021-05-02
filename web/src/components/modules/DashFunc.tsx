import { dashFuncType } from "@type/dashFuncType";

interface DashFuncProps {
  info: dashFuncType;
  onClick: () => void;
}

const DashFunc: React.FC<DashFuncProps> = ({
  info: { title, color, Icon },
  onClick,
}) => {
  const cssColor =
    color === "red"
      ? "bg-accent hover:bg-accent-hover"
      : "bg-secondary hover:bg-secondary-washed-out";

  return (
    <div className="py-5 mx-auto cursor-pointer" onClick={onClick}>
      <div
        className={`h-16 sm:h-24 w-60 flex items-center justify-center 
        text-primary-100 ${cssColor} rounded-md transition duration-200 
        ease-in-out cursor-pointer flex items-center justify-center`}
      >
        <Icon className="h-12 w-12" />
        <h3 className="text-2xl font-medium ml-4">{title}</h3>
      </div>
    </div>
  );
};

export default DashFunc;
