import MainDrop from "@module/MainDrop";
import StatusDrop from "@module/StatusDrop";
import { MeQuery } from "generated/graphql";
import { useState } from "react";

interface DropdownProps {
  data?: MeQuery;
}

const Dropdown: React.FC<DropdownProps> = ({ data }) => {
  const [active, setActive] = useState<string>("main");
  const [height, setHeight] = useState();

  return (
    <div
      className="absolute top-16 right-0 xs:right-6 w-80 bg-white overflow-hidden
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
      />
    </div>
  );
};

export default Dropdown;
