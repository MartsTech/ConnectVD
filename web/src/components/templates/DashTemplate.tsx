import SectionLabel from "@element/SectionLabel";
import { UserIcon } from "@heroicons/react/solid";
import DashBoard from "@section/DashBoard";

interface DashTemplateProps {
  useSidebar: boolean;
  Friends: JSX.Element;
  Profile: JSX.Element;
}

const DashTemplate: React.FC<DashTemplateProps> = ({
  useSidebar,
  Friends,
  Profile,
}) => {
  return (
    <div className="h-full w-full flex items-center justify-evenly bg-[#0b0e11]">
      <div className="hidden xl:flex flex-col w-80 h-full overflow-y-scroll scrollbar-hide">
        {Friends}
      </div>
      <div
        className="flex flex-col xl:hidden absolute left-0 top-16 w-full sm:w-80 
      h-full overflow-y-scroll scrollbar-hide"
      >
        {useSidebar && Friends}
      </div>
      <div
        className="h-full sm:h-auto w-full md:w-[580px] lg:w-1/2 max-w-3xl flex flex-col
        border border-gray-300 shadow-xl space-y-10 pb-10 bg-white"
      >
        <DashBoard />
      </div>
      <div className="h-full hidden lg:flex flex-col">
        <SectionLabel Icon={UserIcon} title="Profile" />
        {Profile}
      </div>
    </div>
  );
};

export default DashTemplate;
