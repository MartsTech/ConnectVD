import Logo from "@element/Logo";
import SearchBar from "@element/SearchBar";
import HeaderOptions from "@module/HeaderOptions";
import { MeQuery } from "generated/graphql";
import { useRouter } from "next/router";
import { useState } from "react";

interface HeaderProps {
  home: string;
  data?: MeQuery;
}

const Header: React.FC<HeaderProps> = ({ home, data }) => {
  const [search, setSearch] = useState("");

  const router = useRouter();

  return (
    <div
      className="flex items-center justify-between py-4 md:px-4 
    bg-white sticky top-0 z-50 h-16"
    >
      <Logo onClick={() => router.push(home)} />
      <SearchBar value={search} setValue={setSearch} />
      <HeaderOptions data={data} />
    </div>
  );
};

export default Header;
