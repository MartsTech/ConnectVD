interface ImportantButtonProps {
  title: string;
  onClick: () => void;
}

const ImportantButton: React.FC<ImportantButtonProps> = ({
  title,
  onClick,
}) => {
  return (
    <button
      className="h-12 w-24 xs:w-40 flex items-center justify-center 
          text-primary-100 rounded-md transition duration-200 
          ease-in-out cursor-pointer bg-accent hover:bg-accent-hover
          focus:outline-none"
      onClick={onClick}
    >
      <h3 className="text-lg">{title}</h3>
    </button>
  );
};

export default ImportantButton;
