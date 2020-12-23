import { Avatar } from "@material-ui/core";
import React from "react";
import "./DropdownItem.css";

const DropdownItem = ({ avatar, text, icon, onClick }) => {
  return (
    <div onClick={onClick} className="dropdownItem">
      {avatar && <Avatar className="dropdownItem__icon">{text[0]}</Avatar>}
      {icon && (
        <div className="dropdonwItem__iconContainer">
          <div className="dropdownItem__icon">{icon}</div>
        </div>
      )}
      {text && <h3>{text}</h3>}
    </div>
  );
};

export default DropdownItem;
