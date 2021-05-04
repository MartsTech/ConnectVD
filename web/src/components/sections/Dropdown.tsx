import MainDrop from "@module/MainDrop";
import StatusDrop from "@module/StatusDrop";
import { User } from "generated/graphql";
import { useState } from "react";

interface DropdownProps {
  data?: User;
  onStatus: (status: string) => Promise<void>;
}

const Dropdown: React.FC<DropdownProps> = ({ data, onStatus }) => {
  const [active, setActive] = useState<string>("main");
  const [height, setHeight] = useState();

  return (
    <div
      className="fixed top-16 right-0 xs:right-6 w-72 bg-primary-800 overflow-hidden
    transition-all ease-in-out duration-500"
      style={{ height: height }}
    >
      <MainDrop
        data={data}
        active={active}
        toNext={() => setActive("status")}
        setHeight={setHeight}
      />
      <StatusDrop
        active={active}
        toPrev={() => setActive("main")}
        setHeight={setHeight}
        onStatus={onStatus}
      />
    </div>
  );
};

export default Dropdown;
