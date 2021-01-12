import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import React from "react";
import { useSelector } from "react-redux";
import { DropdownItem } from "./DropdownItem";
import { selectUser } from "../features/userSlice";
import { auth } from "../firebase";
import styles from "../styles/Dropdown.module.css";

export const Dropdown: React.FC<{}> = ({}) => {
  const user = useSelector(selectUser);

  return (
    <div className={styles.dropdown}>
      <DropdownItem avatar={true} text={user.displayName} />
      <DropdownItem
        icon={<ExitToAppIcon />}
        text="Log Out"
        onClick={() => auth.signOut()}
      />
    </div>
  );
};
