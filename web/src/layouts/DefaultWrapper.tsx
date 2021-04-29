interface DefaultWrapperProps {}

const DefaultWrapper: React.FC<DefaultWrapperProps> = ({ children }) => {
  return <div className="h-screen w-screen">{children}</div>;
};

export default DefaultWrapper;
