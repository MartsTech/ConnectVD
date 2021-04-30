interface PreviewCardProps {
  title: string;
  Icon: JSX.Element;
  onClick: () => void;
}

const PreviewCard: React.FC<PreviewCardProps> = ({ title, Icon, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex items-center p-3 hover:shadow-md transition duration-100 
        transform hover:bg-gray-200 cursor-pointer border border-gray-200
        bg-white h-16"
    >
      {Icon}
      <h3 className="text-lg ml-2 font-medium text-gray-500 capitalize">
        {title}
      </h3>
    </div>
  );
};

export default PreviewCard;
