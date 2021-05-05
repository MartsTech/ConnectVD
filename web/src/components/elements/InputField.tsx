import { setHookType } from "@type/setHookType";

interface InputFieldProps {
  type: "email" | "password" | "name";
  value: string;
  setValue: setHookType;
  className?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  value,
  setValue,
  type,
  className,
}) => {
  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      type={type === "name" ? "text" : type}
      placeholder={type}
      className={`flex-grow py-3 px-4 rounded-8 text-primary-100 
        focus:outline-none bg-primary-600 rounded-lg mb-5 ${className}`}
    />
  );
};

export default InputField;
