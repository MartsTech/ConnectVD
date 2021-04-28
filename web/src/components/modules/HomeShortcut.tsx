import { IconType } from "@type/IconType";
import { Link } from "react-scroll";

interface HomeShortcutProps {
  title: string;
  Icon: IconType;
}

const HomeShortcut: React.FC<HomeShortcutProps> = ({ title, Icon }) => {
  return (
    <div className="flex flex-col items-center space-y-2">
      <Link
        activeClass="active"
        to={title}
        spy={true}
        smooth={true}
        duration={1000}
      >
        <div className="bg-[#3f51b5] p-6 rounded-full opacity-90 hover:opacity-100">
          <Icon
            className="text-white text-5xl transition duration-100 transform 
    hover:scale-110"
          />
        </div>
      </Link>
      <h3 className="capitalize text-white text-xl font-medium pb-1">
        {title}
      </h3>
    </div>
  );
};

export default HomeShortcut;
