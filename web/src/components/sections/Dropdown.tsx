import Profile from "@element/Profile";
import { MeQuery } from "generated/graphql";

interface DropdownProps {
  data?: MeQuery;
}

const Dropdown: React.FC<DropdownProps> = ({ data }) => {
  return (
    <div className="absolute top-16 right-6">
      <Profile data={data} />
    </div>
  );
};

export default Dropdown;
