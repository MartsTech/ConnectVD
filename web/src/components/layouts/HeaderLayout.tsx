interface HeaderLayoutProps {
  Header: JSX.Element;
}

const HeaderLayout: React.FC<HeaderLayoutProps> = ({ Header, children }) => {
  return (
    <div className="h-screen w-screen">
      {Header}
      <div className="h-header w-full">{children}</div>
    </div>
  );
};

export default HeaderLayout;
