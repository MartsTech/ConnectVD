import ButtonLink from "@element/ButtonLink";
import Logo from "@element/Logo";
import SearchBar from "@module/SearchBar";

import { useState } from "react";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = ({}) => {
  const [search, setSearch] = useState("");

  return (
    <div className="flex items-center justify-between py-4 md:px-4">
      <Logo />
      <SearchBar value={search} setValue={setSearch} />
      <div className="flex space-x-1 last:mr-1">
        <ButtonLink title="Login" href="login" />
        <ButtonLink title="Register" href="register" outlined />
      </div>
    </div>
  );
};

export default Header;
