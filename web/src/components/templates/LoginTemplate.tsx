import Image from "next/image";

interface LoginTemplateProps {
  SignInButton: JSX.Element;
  EmailField: JSX.Element;
  PasswordField: JSX.Element;
  LoginButton: JSX.Element;
}

const LoginTemplate: React.FC<LoginTemplateProps> = ({
  SignInButton,
  EmailField,
  PasswordField,
  LoginButton,
}) => {
  return (
    <div className="h-screen flex items-center justify-center bg-primary-900">
      <div className="max-h-full flex flex-col bg-primary-100 py-28 px-12 space-y-2 text-center">
        <Image
          src="/images/logo.png"
          width={350}
          height={150}
          objectFit="contain"
          alt="Logo"
        />
        {SignInButton}
        <p>or</p>
        {EmailField}
        {PasswordField}
        {LoginButton}
      </div>
    </div>
  );
};

export default LoginTemplate;
