import DashFriends from "@section/DashFriends";
import DashFuncs from "@section/DashFuncs";
import DashMessage from "@section/DashMessage";
import DefaultLayout from "layouts/DefaultLayout";

interface DashTemplateProps {
  Profile: JSX.Element;
}

const DashTemplate: React.FC<DashTemplateProps> = ({ Profile }) => {
  return (
    <DefaultLayout path="/dash">
      <div className="h-full max-h-header flex items-center px-20">
        <DashFriends />
        <div className="h-full w-2/3 max-w-3xl mx-auto text-center space-y-10">
          <DashMessage />
          <DashFuncs />
        </div>
        <div className="h-full">{Profile}</div>
      </div>
    </DefaultLayout>
  );
};

export default DashTemplate;
