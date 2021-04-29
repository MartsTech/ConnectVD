import { ArrowUpIcon } from "@heroicons/react/solid";
import { Link } from "react-scroll";

interface ToTopButtonProps {}

const ToTopButton: React.FC<ToTopButtonProps> = ({}) => {
  return (
    <div
      className="absolute top-[-24px] left-1/2 ml-[-30px] z-10 w-14 h-14 bg-[#525252]
        text-white rounded-full flex items-center justify-center
        transition duration-100 transform hover:scale-110 hover:bg-[#3f51b5]
        shadow-lg
    "
    >
      <Link
        activeClass="active"
        to="top"
        spy={true}
        smooth={true}
        duration={1000}
      >
        <ArrowUpIcon className="h-7 w-7" />
      </Link>
    </div>
  );
};

export default ToTopButton;
