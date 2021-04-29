import DashFriends from "@section/DashFriends";
import DashFuncs from "@section/DashFuncs";
import Header from "@section/Header";

interface DashTemplateProps {}

const DashTemplate: React.FC<DashTemplateProps> = () => {
  return (
    <div className="h-full flex flex-col">
      <Header home="/dash" />
      <div className="h-full max-h-header flex items-center">
        <DashFriends />
        <div className="w-2/3 max-w-3xl mx-auto pb-40 border">
          <DashFuncs />
        </div>
      </div>
    </div>
  );
};

export default DashTemplate;
