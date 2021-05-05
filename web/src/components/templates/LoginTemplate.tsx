import Image from "next/image";
interface LoginTemplateProps {
  SignInButton: JSX.Element;
  EmailField: JSX.Element;
  PasswordField: JSX.Element;
  LoginButton: JSX.Element;
  NameField: JSX.Element;
  Switch: JSX.Element;
}

const LoginTemplate: React.FC<LoginTemplateProps> = ({
  SignInButton,
  EmailField,
  PasswordField,
  LoginButton,
  NameField,
  Switch,
}) => {
  return (
    <div className="h-screen flex items-center justify-center bg-primary-900">
      <div className="max-h-full flex flex-col bg-primary-700 py-28 px-12 space-y-2 text-center">
        <div className="flex items-center space-x-1 cursor-pointer">
          <Image
            src="/favicon.ico"
            height={120}
            width={120}
            objectFit="contain"
            alt="Logo"
            className="z-10"
          />
          <h1 className={`text-4xl sm:text-5xl font-mono text-primary-100`}>
            Connect<span className="text-secondary">VD</span>
          </h1>
        </div>
        <div className="flex flex-col space-y-4">
          <div className="flex">{SignInButton}</div>
          <p className="text-primary-100">or</p>
          {NameField}
          {EmailField}
          {PasswordField}
          <div className="flex">{LoginButton}</div>
          {Switch}
        </div>
      </div>
    </div>
  );
};

export default LoginTemplate;
