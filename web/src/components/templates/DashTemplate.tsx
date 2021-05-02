import SectionLabel from "@element/SectionLabel";
import { UserIcon } from "@heroicons/react/solid";

interface DashTemplateProps {
  Friends: JSX.Element;
  Profile: JSX.Element;
  Board: JSX.Element;
  useSidebar: boolean;
}

const DashTemplate: React.FC<DashTemplateProps> = ({
  Friends,
  Profile,
  Board,
  useSidebar,
}) => {
  return (
    <div className="h-full w-full flex items-center justify-evenly bg-primary-900">
      <div className="hidden xl:flex flex-col w-80 h-full overflow-y-scroll scrollbar-hide">
        {Friends}
      </div>
      <div
        className="flex flex-col xl:hidden absolute left-0 top-16 
      h-header overflow-y-scroll scrollbar-hide border"
      >
        {useSidebar && Friends}
      </div>
      <div
        className="h-full sm:h-auto w-full md:w-[580px] lg:w-1/2 max-w-3xl flex
        border border-gray-300 flex-col space-y-10 pb-10 bg-white"
      >
        {Board}
      </div>
      <div className="h-full hidden lg:flex flex-col">
        <SectionLabel Icon={UserIcon} title="Profile" />
        {Profile}
      </div>
    </div>
  );
};

export default DashTemplate;
