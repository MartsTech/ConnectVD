import { IconType } from "@type/IconType";
import { Link } from "react-scroll";

interface HomeShortcutProps {
  title: string;
  Icon: IconType;
}

const HomeShortcut: React.FC<HomeShortcutProps> = ({ title, Icon }) => {
  return (
    <div className="text-white flex flex-col items-center space-y-3">
      <Link
        activeClass="active"
        to={title}
        spy={true}
        smooth={true}
        duration={1000}
      >
        <div
          className="bg-secondary rounded-full h-24 w-24 opacity-90 hover:opacity-100
        flex items-center justify-center"
        >
          <Icon className="h-12 w-12" />
        </div>
      </Link>
      <h3 className="capitalize text-xl font-medium pb-1">{title}</h3>
    </div>
  );
};

export default HomeShortcut;
