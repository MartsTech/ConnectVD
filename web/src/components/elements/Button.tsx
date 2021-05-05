interface ImportantButtonProps {
  title: string;
  onClick?: () => void;
  primary?: boolean;
  secondary?: boolean;
  type?: "button" | "submit" | "reset";
  extend?: boolean;
}

const ImportantButton: React.FC<ImportantButtonProps> = ({
  title,
  onClick,
  type,
  primary,
  secondary,
  extend = false,
}) => {
  return (
    <button
      className={`h-12 w-24 xs:w-40 flex items-center justify-center 
          text-primary-100 rounded-md transition duration-200 
          ease-in-out cursor-pointer focus:outline-none ${
            primary && "bg-accent hover:bg-accent-hover"
          } ${secondary && "bg-secondary hover:bg-secondary-washed-out"} ${
        extend && "w-full flex-grow"
      }`}
      onClick={onClick}
      type={type}
    >
      <h3 className="text-lg">{title}</h3>
    </button>
  );
};

export default ImportantButton;
