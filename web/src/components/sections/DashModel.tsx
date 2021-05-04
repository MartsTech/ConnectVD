import Button from "@element/ImportantButton";
import Modal from "@element/Model";
import { setHookType } from "@type/setHookType";

interface DashModelProps {
  open: boolean;
  onClose: () => void;
  title: string;
  button: string;
  onButton: () => void;
  field: string;
  value: string;
  setValue: setHookType;
  fieldType?: string;
}

const DashModel: React.FC<DashModelProps> = ({
  open,
  onClose,
  title,
  button,
  field,
  onButton,
  fieldType = "text",
  value,
  setValue,
}) => {
  return (
    <Modal isOpen={open} onRequestClose={onClose}>
      <div className="flex-grow flex flex-col pt-5 pb-10">
        <div
          className="flex items-center justify-between xs:p-4 rounded-t-8 w-full 
      border-b border-primary-600 sticky top-0 z-10 bg-primary-700 text-left"
        >
          <p className="text-primary-100 text-lg sm:text-xl font-bold">
            {title}
          </p>
          <Button title={button} onClick={onButton} />
        </div>
        <div className="flex flex-col">
          <h3 className="flex p-4 text-primary-100">{field}</h3>
          <form className="flex-grow flex">
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="flex-grow py-3 px-4 rounded-8 text-primary-100 
          focus:outline-none bg-primary-600 rounded-lg mb-5"
              type={fieldType}
            />
            <button
              hidden
              onClick={(e) => {
                e.preventDefault();
                onButton();
              }}
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default DashModel;
