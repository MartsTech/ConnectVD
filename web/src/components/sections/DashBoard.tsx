import DashFunc from "@module/DashFunc";
import DashMessage from "@module/DashMessage";
import dashFunctions from "@service/dashFuncsInfo";

interface DashBoardProps {
  startMeeting: () => void;
}

const DashBoard: React.FC<DashBoardProps> = ({ startMeeting }) => {
  return (
    <div className="text-center flex flex-col sm:space-y-7">
      <DashMessage />
      <div className="grid grid-cols-1 md:grid-cols-2">
        {dashFunctions.map((info) => (
          <DashFunc
            key={info.title}
            info={info}
            onClick={info.id === "start" ? startMeeting : () => alert("TODO")}
          />
        ))}
      </div>
    </div>
  );
};

export default DashBoard;
