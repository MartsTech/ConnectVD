import DashFunc from "@module/DashFunc";
import DashMessage from "@module/DashMessage";
import dashFunctions from "@service/dashFuncsInfo";

interface DashBoardProps {}

const DashBoard: React.FC<DashBoardProps> = ({}) => {
  return (
    <div className="">
      <div className="w-full">
        <DashMessage />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 justify-around">
        {dashFunctions.map((info) => (
          <DashFunc key={info.title} info={info} />
        ))}
      </div>
    </div>
  );
};

export default DashBoard;
