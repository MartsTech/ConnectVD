import Logo from "@element/Logo";
import HeaderOptions from "@module/HeaderOptions";
import SearchBar from "@element/SearchBar";
import { useRouter } from "next/router";
import { useState } from "react";

interface HeaderProps {
  home: string;
}

const Header: React.FC<HeaderProps> = ({ home }) => {
  const [search, setSearch] = useState("");

  const router = useRouter();

  return (
    <div
      className="flex items-center justify-between py-4 md:px-4 
    bg-white sticky top-0 z-50"
    >
      <Logo onClick={() => router.push(home)} />
      <SearchBar value={search} setValue={setSearch} />
      <HeaderOptions home={home} />
    </div>
  );
};

export default Header;
