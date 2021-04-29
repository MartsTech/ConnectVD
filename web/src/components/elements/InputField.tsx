import { Dispatch, SetStateAction } from "react";

interface InputFieldProps {
  type: "email" | "password";
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

const InputField: React.FC<InputFieldProps> = ({ value, setValue, type }) => {
  return (
    <div
      className="flex-grow px-6 py-3 border border-gray-300
       bg-[#f5f5f5] rounded-lg shadow-lg"
    >
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type={type}
        placeholder={type}
        className="flex-grow w-full focus:outline-none bg-transparent ml-2 text-lg"
      />
    </div>
  );
};

export default InputField;
