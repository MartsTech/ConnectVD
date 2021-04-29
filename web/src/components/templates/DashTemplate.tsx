import DashFuncs from "@section/DashFuncs";
import Header from "@section/Header";

interface DashTemplateProps {}

const DashTemplate: React.FC<DashTemplateProps> = () => {
  return (
    <div className="h-full flex flex-col">
      <Header home="/dash" />
      <div className="w-2/3 max-w-3xl self-center mt-40">
        <DashFuncs />
      </div>
    </div>
  );
};

export default DashTemplate;
