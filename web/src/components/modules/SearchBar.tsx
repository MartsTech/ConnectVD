import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";
import { Dispatch, SetStateAction } from "react";

interface SearchBarProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, setValue }) => {
  return (
    <form
      className="hidden xs:flex items-center flex-grow max-w-5xl px-6 py-3 mx-5 border
      border-gray-200 bg-[#f5f5f5] rounded-lg shadow-lg"
    >
      <SearchIcon className="h-6 text-[#3f51b5] hidden sm:inline-block" />
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="text"
        placeholder="Search"
        className="flex-grow w-full focus:outline-none bg-transparent ml-2 text-lg"
      />
      <ClearIcon
        className="h-7 text-gray-500 cursor-pointer transition duration-100 transform 
    hover:scale-125 sm:mr-3"
      />
      <button hidden type="submit">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
