interface IconButtonProps {
  onClick?: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({ onClick, children }) => {
  return (
    <div
      onClick={onClick}
      className="rounded-full hover:bg-gray-100 p-2 cursor-pointer"
    >
      {children}
    </div>
  );
};

export default IconButton;
