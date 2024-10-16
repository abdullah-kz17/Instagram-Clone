import { Outlet } from "react-router-dom";
import Feed from "./Feed";
import MainLayout from "./MainLayout";
import RightSidebar from "./RightSidebar";
import useGetAllPosts from "@/hooks/useGetAllPosts";

const Home = () => {
  useGetAllPosts();
  return (
    <MainLayout>
      <div className="flex">
        <div className="flex-start">
          <Feed />
          <Outlet />
        </div>
        <RightSidebar />
      </div>
    </MainLayout>
  );
};

export default Home;
