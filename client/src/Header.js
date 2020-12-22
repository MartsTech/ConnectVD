import { Avatar } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import "./Header.css";

const Header = () => {
  const user = useSelector(selectUser);

  return (
    <div className="header">
      <div className="headerContainer">
        <div className="header__left">
          <h3>ConnectVD</h3>
        </div>
        <div className="header__right">
          {user && <Avatar>{user?.displayName[0]}</Avatar>}
        </div>
      </div>
    </div>
  );
};

export default Header;
