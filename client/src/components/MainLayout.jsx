import LeftSidebar from "./LeftSidebar";

const MainLayout = ({ children }) => {
  return (
    <div className="flex">
      <LeftSidebar />
      <div className="flex-grow">{children}</div>
    </div>
  );
};

export default MainLayout;
