import Avatar from "@element/Avatar";
import ButtonLink from "@element/ButtonLink";
import IconButton from "@element/IconButton";
import { BellIcon, MailIcon } from "@heroicons/react/solid";

interface HeaderOptionsProps {
  home: string;
}

const HeaderOptions: React.FC<HeaderOptionsProps> = ({ home }) => {
  if (home == "/dash") {
    return (
      <div className="flex items-center">
        <IconButton>
          <MailIcon className="h-7 w-7 text-gray-500" />
        </IconButton>
        <IconButton>
          <BellIcon className="h-7 w-7 text-gray-500" />
        </IconButton>
        <IconButton>
          <Avatar />
        </IconButton>
      </div>
    );
  }

  return (
    <div className="flex space-x-1 last:mr-1">
      <ButtonLink title="Login" href="login" />
      <ButtonLink title="Register" href="register" outlined />
    </div>
  );
};

export default HeaderOptions;
