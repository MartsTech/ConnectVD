import Badge from "@element/Badge";
import PreviewCard from "@element/PreviewCard";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import { setHookType } from "@type/setHookType";
import { CSSTransition } from "react-transition-group";

interface StatusDropProps {
  active: string;
  toPrev: () => void;
  setHeight: setHookType;
  onStatus?: (status: string) => Promise<void>;
}

const StatusDrop: React.FC<StatusDropProps> = ({
  active,
  toPrev,
  setHeight,
  onStatus,
}) => {
  return (
    <CSSTransition
      in={active === "status"}
      unmountOnExit
      timeout={500}
      classNames="menu-secondary"
      onEnter={(el: any) => setHeight(el.offsetHeight)}
    >
      <div className="">
        <PreviewCard
          Icon={<ArrowLeftIcon className="h-7 w-7 text-gray-500" />}
          title=""
          onClick={toPrev}
          important
        />
        <PreviewCard
          Icon={<Badge status="available" size={2} />}
          title="Available"
          onClick={() => {
            if (onStatus) {
              onStatus("available");
            }
            toPrev();
          }}
          important
        />
        <PreviewCard
          Icon={<Badge status="away" size={2} />}
          title="Away"
          onClick={() => {
            if (onStatus) {
              onStatus("away");
            }
            toPrev();
          }}
          important
        />
        <PreviewCard
          Icon={<Badge status="busy" size={2} />}
          title="Busy"
          onClick={() => {
            if (onStatus) {
              onStatus("busy");
            }
            toPrev();
          }}
          important
        />
      </div>
    </CSSTransition>
  );
};

export default StatusDrop;
