interface IconButtonProps {
  onClick?: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({ onClick, children }) => {
  return (
    <div
      onClick={onClick}
      className="rounded-full p-2 cursor-pointer transition-all ease-in 
      transform hover:scale-110"
    >
      {children}
    </div>
  );
};

export default IconButton;
