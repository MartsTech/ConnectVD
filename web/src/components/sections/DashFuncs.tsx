import DashFunc from "@module/DashFunc";
import dashFunctions from "@service/dashFuncsInfo";

interface DashFunctionsProps {}

const DashFunctions: React.FC<DashFunctionsProps> = ({}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 justify-around">
      {dashFunctions.map((info) => (
        <DashFunc key={info.title} info={info} />
      ))}
    </div>
  );
};

export default DashFunctions;
