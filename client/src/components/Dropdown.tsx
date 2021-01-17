import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { auth } from "../firebase";
import styles from "../styles/Dropdown.module.css";
import { DropdownItem } from "./DropdownItem";

export const Dropdown: React.FC = () => {
  const user = useSelector(selectUser);

  return (
    <div className={styles.dropdown}>
      <DropdownItem avatar={true} text={user.displayName} />
      <DropdownItem
        text="Log Out"
        Icon={ExitToAppIcon}
        onClick={() => auth.signOut()}
      />
    </div>
  );
};
