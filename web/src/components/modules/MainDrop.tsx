import { auth } from "@config/firebase";
import Badge from "@element/Badge";
import PreviewCard from "@element/PreviewCard";
import Profile from "@element/Profile";
import { LogoutIcon } from "@heroicons/react/solid";
import { setHookType } from "@type/setHookType";
import { User } from "generated/graphql";
import { CSSTransition } from "react-transition-group";

interface MainDropProps {
  data?: User;
  active: string;
  toNext: () => void;
  setHeight: setHookType;
}

const MainDrop: React.FC<MainDropProps> = ({
  data,
  active,
  toNext,
  setHeight,
}) => {
  return (
    <CSSTransition
      in={active === "main"}
      unmountOnExit
      timeout={500}
      classNames="menu-primary"
      onEnter={(el: any) => setHeight(el.offsetHeight)}
    >
      <div>
        <Profile data={data as User} important />
        <PreviewCard
          Icon={<Badge status={data?.status as any} size={2} />}
          title={data?.status || ""}
          onClick={toNext}
          important
        />
        <PreviewCard
          Icon={<LogoutIcon className="h-7 w-7 text-primary-300" />}
          title="Log Out"
          onClick={() => auth.signOut()}
          important
        />
      </div>
    </CSSTransition>
  );
};

export default MainDrop;
