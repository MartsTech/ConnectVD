import { Avatar } from "@material-ui/core";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import Dropdown from "./Dropdown";
import "./Header.css";

const Header = () => {
  const [opened, setOpen] = useState(false);

  const user = useSelector(selectUser);

  return (
    <nav className="header">
      <div className="headerContainer">
        <div className="header__left">
          <h3>ConnectVD</h3>
        </div>
        <div className="header__right">
          {user && (
            <Avatar className="header__avatar" onClick={() => setOpen(!opened)}>
              {user?.displayName[0]}
            </Avatar>
          )}
          {opened && <Dropdown />}
        </div>
      </div>
    </nav>
  );
};

export default Header;
