import Modal from "@element/Model";
import Button from "@element/ImportantButton";

interface DashModelProps {
  open: boolean;
  onClose: () => void;
  title: string;
  button: string;
  onButton: () => void;
  field: string;
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
}) => {
  return (
    <Modal isOpen={open} onRequestClose={onClose}>
      <div className="flex-grow flex flex-col pt-5 pb-10">
        <div
          className="flex items-center justify-between p-4 rounded-t-8 w-full 
      border-b border-primary-600 sticky top-0 z-10 bg-primary-700"
        >
          <p className="text-primary-100 text-xl font-bold">{title}</p>
          <Button title={button} onClick={onButton} />
        </div>
        <div className="flex flex-col">
          <h3 className="flex p-4 mx-6 text-primary-100">{field}</h3>
          <input
            className="flex-grow py-3 px-4 mx-10 rounded-8 text-primary-100 
          focus:outline-none bg-primary-600 rounded-lg mb-5"
            type={fieldType}
          />
        </div>
      </div>
    </Modal>
  );
};

export default DashModel;
