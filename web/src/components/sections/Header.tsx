import IconButton from "@element/IconButton";
import Logo from "@element/Logo";
import SearchBar from "@element/SearchBar";
import { MenuIcon } from "@heroicons/react/solid";
import HeaderOptions from "@module/HeaderOptions";
import { MeQuery } from "generated/graphql";
import { route } from "next/dist/next-server/server/router";
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

  const inHome = router.pathname === "/";

  return (
    <div
      className={`flex items-center justify-between py-4 md:px-4 
    ${inHome ? "bg-white" : "bg-primary-700"} sticky top-0 z-30 h-16`}
    >
      <div className="flex">
        <div className="inline-block xl:hidden">
          <IconButton onClick={onMenu}>
            <MenuIcon className="h-7 w-7 text-primary-200" />
          </IconButton>
        </div>
        <Logo onClick={() => router.push(home)} inHome={inHome} />
      </div>
      <SearchBar value={search} setValue={setSearch} inHome={inHome} />
      <HeaderOptions
        data={data}
        onAvatar={() => setDropdown(!dropdown)}
        onMail={() => router.push("/emails")}
      />
      {dropdown && <Dropdown data={data} />}
    </div>
  );
};

export default Header;
