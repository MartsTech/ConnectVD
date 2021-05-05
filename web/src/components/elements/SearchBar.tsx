import { XIcon } from "@heroicons/react/solid";
import { SearchIcon } from "@heroicons/react/outline";
import { setHookType } from "@type/setHookType";

interface SearchBarProps {
  value: string;
  setValue: setHookType;
  inHome?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  setValue,
  inHome = false,
}) => {
  return (
    <form
      className={`hidden xs:flex items-center flex-grow max-w-5xl px-2 py-3 mx-2
      ${
        inHome
          ? "border border-gray-200 bg-[#f5f5f5] shadow-lg text-gray-500"
          : "bg-primary-600 text-primary-100"
      } rounded-lg`}
    >
      <SearchIcon className="h-6 hidden sm:inline-block" />
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="text"
        placeholder="Search"
        className="flex-grow w-full focus:outline-none bg-transparent ml-2 text-lg"
      />
      <XIcon
        className="h-7 cursor-pointer transition duration-100 transform 
    hover:scale-125 sm:mr-3"
        onClick={() => setValue("")}
      />
      <button hidden type="submit">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
