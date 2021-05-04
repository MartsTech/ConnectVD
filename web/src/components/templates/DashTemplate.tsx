interface DashTemplateProps {
  Friends: JSX.Element;
  Profile: JSX.Element;
  Main: JSX.Element;
  useSidebar: boolean;
}

const DashTemplate: React.FC<DashTemplateProps> = ({
  Friends,
  Profile,
  Main,
  useSidebar,
}) => {
  return (
    <div className="h-full w-full flex justify-center bg-primary-900">
      <div
        className="hidden xl:flex flex-col w-80 pb-14 overflow-y-scroll 
      scrollbar-hide pt-10"
      >
        {Friends}
      </div>
      <div
        className="flex flex-col xl:hidden absolute left-0 
      h-header overflow-y-scroll scrollbar-hide z-50"
      >
        {useSidebar && Friends}
      </div>
      <div
        className="h-full w-full lg:w-1/2 max-w-3xl 
      flex flex-col space-y-10 sm:pt-10 xs:pb-16"
      >
        {Main}
      </div>
      <div className="sm:pb-16 hidden lg:flex w-80 pt-10">
        <div className="w-8"></div>
        <div className="w-72">{Profile}</div>
      </div>
    </div>
  );
};

export default DashTemplate;
