interface SignInButtonProps {
  title: string;
  onClick: () => void;
}

const SignInButton: React.FC<SignInButtonProps> = ({ title, onClick }) => {
  return (
    <button
      className="bg-[#3f51b5] text-white outline-none py-2 rounded-lg"
      onClick={onClick}
    >
      <h3 className="text-lg">{title}</h3>
    </button>
  );
};

export default SignInButton;
