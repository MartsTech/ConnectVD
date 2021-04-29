import Header from "@section/Header";
import DefaultWrapper from "./DefaultWrapper";

interface DefaultLayoutProps {
  path: string;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ path, children }) => {
  return (
    <DefaultWrapper>
      <Header home={path} />
      {children}
    </DefaultWrapper>
  );
};

export default DefaultLayout;
