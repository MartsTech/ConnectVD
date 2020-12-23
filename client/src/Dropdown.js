import React from "react";
import { useSelector } from "react-redux";
import DropdownItem from "./DropdownItem";
import { selectUser } from "./features/userSlice";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import "./Dropdown.css";
import { auth } from "./firebase";

const Dropdown = () => {
  const user = useSelector(selectUser);

  return (
    <div className="dropdown">
      <DropdownItem avatar={true} text={user.displayName} />
      <DropdownItem
        icon={<ExitToAppIcon />}
        text="Log Out"
        onClick={() => auth.signOut()}
      />
    </div>
  );
};

export default Dropdown;
