import IconButton from "@element/IconButton";
import Logo from "@element/Logo";
import SearchBar from "@element/SearchBar";
import { MenuIcon } from "@heroicons/react/solid";
import HeaderOptions from "@module/HeaderOptions";
import { MeQuery } from "generated/graphql";
import { useRouter } from "next/router";
import { useState } from "react";
import Dropdown from "./Dropdown";

interface HeaderProps {
  home: string;
  data?: MeQuery;
  onMenu?: () => void;
}

const Header: React.FC<HeaderProps> = ({ home, data, onMenu }) => {
  const [dropdown, setDropdown] = useState(false);
  const [search, setSearch] = useState("");

  const router = useRouter();

  return (
    <div
      className="flex items-center justify-between py-4 md:px-4 
    bg-white sticky top-0 z-50 h-16"
    >
      <div className="inline-block xl:hidden">
        <IconButton onClick={onMenu}>
          <MenuIcon className="h-7 w-7 text-gray-500" />
        </IconButton>
      </div>
      <Logo onClick={() => router.push(home)} />
      <SearchBar value={search} setValue={setSearch} />
      <HeaderOptions data={data} onAvatar={() => setDropdown(!dropdown)} />
      {dropdown && <Dropdown data={data} />}
    </div>
  );
};

export default Header;
