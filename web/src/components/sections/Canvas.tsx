import ButtonLink from "@element/ButtonLink";
import appInfo from "@service/appInfo";
import Image from "next/image";

interface CanvasProps {}

const Canvas: React.FC<CanvasProps> = ({}) => {
  return (
    <div
      className="flex flex-col md:flex-row items-center justify-around py-2
      space-y-5"
    >
      <div className="text-center space-y-5 px-5 pt-10">
        <h1 className="text-5xl font-medium">{appInfo.title}</h1>
        <p className="text-3xl">{appInfo.slogan}</p>
        <div className="space-x-2">
          <ButtonLink title="Sign Up Now" href="register" />
          <ButtonLink title="Login" href="login" outlined />
        </div>
      </div>
      <div className="">
        <Image
          src="/images/canvas.jpg"
          height={460}
          width={700}
          objectFit="contain"
        />
      </div>
    </div>
  );
};

export default Canvas;
