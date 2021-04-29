interface IconButtonProps {}

const IconButton: React.FC<IconButtonProps> = ({ children }) => {
  return (
    <div className="rounded-full hover:bg-gray-100 p-2 cursor-pointer">
      {children}
    </div>
  );
};

export default IconButton;
