import Avatar from "@material-ui/core/Avatar";
import React from "react";
import "../styles/DropdownItem.css";

type dropdownItemProps = {
  text: string;
  avatar?: boolean;
  icon?: any;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

export const DropdownItem: React.FC<dropdownItemProps> = ({
  avatar,
  text,
  icon,
  onClick,
}) => {
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
