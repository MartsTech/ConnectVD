interface PreviewCardProps {
  title: string;
  Icon: JSX.Element;
  onClick: () => void;
  important?: boolean;
}

const PreviewCard: React.FC<PreviewCardProps> = ({
  title,
  Icon,
  onClick,
  important = false,
}) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center p-3 transition duration-100 
        transform cursor-pointer 0 h-16 ${
          important
            ? "bg-primary-800 hover:bg-primary-700"
            : "bg-primary-700 hover:bg-primary-600"
        }`}
    >
      {Icon}
      <h3 className="ml-4 font-semibold text-primary-100 capitalize">
        {title}
      </h3>
    </div>
  );
};

export default PreviewCard;
