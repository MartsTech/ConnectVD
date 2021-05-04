import Avatar from "@element/Avatar";
import ButtonLink from "@element/ButtonLink";
import IconButton from "@element/IconButton";
import { BellIcon, MailIcon } from "@heroicons/react/solid";
import { MeQuery } from "generated/graphql";

interface HeaderOptionsProps {
  data?: MeQuery;
  onAvatar?: () => void;
  onMail?: () => void;
}

const HeaderOptions: React.FC<HeaderOptionsProps> = ({
  data,
  onAvatar,
  onMail,
}) => {
  if (typeof data !== "undefined") {
    return (
      <div className="flex items-center">
        <IconButton onClick={onMail}>
          <MailIcon className="h-7 w-7 text-primary-200" />
        </IconButton>
        <IconButton>
          <BellIcon className="h-7 w-7 text-primary-200" />
        </IconButton>
        <IconButton onClick={onAvatar}>
          <Avatar src={data.me?.photoUrl} status={data.me?.status} />
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
