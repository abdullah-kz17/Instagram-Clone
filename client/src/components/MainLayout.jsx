import LeftSidebar from "./LeftSidebar";

const MainLayout = ({ children }) => {
  return (
    <>
      <LeftSidebar />
      <div className="main-content">{children}</div>
    </>
  );
};

export default MainLayout;
