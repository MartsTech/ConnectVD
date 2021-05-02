import { auth } from "@config/firebase";
import Badge from "@element/Badge";
import PreviewCard from "@element/PreviewCard";
import Profile from "@element/Profile";
import { LogoutIcon } from "@heroicons/react/solid";
import { setHookType } from "@type/setHookType";
import { MeQuery } from "generated/graphql";
import { CSSTransition } from "react-transition-group";

interface MainDropProps {
  data?: MeQuery;
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
      <div className="">
        <Profile data={data} />
        <PreviewCard
          Icon={<Badge status={data?.me?.status as any} size={2} />}
          title={data?.me?.status || ""}
          onClick={toNext}
        />
        <PreviewCard
          Icon={<LogoutIcon className="h-7 w-7 text-primary-300" />}
          title="Log Out"
          onClick={() => auth.signOut()}
        />
      </div>
    </CSSTransition>
  );
};

export default MainDrop;
