import {
  Heart,
  Home,
  LogOut,
  MessageCircle,
  PlusSquare,
  Search,
  TrendingUp,
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/store/AuthContext";
import CreatePost from "./CreatePost";
import { Button } from "./ui/button"; // Import Shadcn Button

const LeftSidebar = () => {
  const { isLoggedIn, logout, user } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout(); // Call logout function
    navigate("/login"); // Navigate to login page
  };

  const sidebarItems = [
    { icon: <Home />, text: "Home", path: "/" },
    { icon: <Search />, text: "Search", path: "/search" },
    { icon: <TrendingUp />, text: "Explore", path: "/explore" },
    { icon: <MessageCircle />, text: "Messages", path: "/messages" },
    { icon: <Heart />, text: "Notifications", path: "/notifications" },
    {
      icon: (
        <Avatar className="w-7 h-7">
          {user?.userData?.profilePicture ? (
            <AvatarImage
              src={user.userData.profilePicture}
              alt={user.username || "User"}
            />
          ) : (
            <AvatarFallback>CN</AvatarFallback>
          )}
        </Avatar>
      ),
      text: "Profile",
      path: "/profile",
    },
    {
      icon: <LogOut />,
      text: "Logout",
      onClick: handleLogout,
    },
  ];

  return (
    <div className="flex flex-col bg-white w-64 h-screen border-r">
      <div className="flex items-center justify-center py-4 border-b">
        <h1 className="text-xl font-bold">Instagram</h1>
      </div>
      <div className="flex-grow overflow-y-auto">
        {sidebarItems.map((item, index) => (
          <Link key={index} to={item.path}>
            <div
              onClick={item.onClick}
              className="flex items-center px-4 py-3 hover:bg-gray-100 transition duration-200 ease-in-out cursor-pointer"
            >
              <div className="text-gray-700">{item.icon}</div>
              <span className="ml-4 text-base font-medium text-gray-800">
                {item.text}
              </span>
            </div>
          </Link>
        ))}
        {/* Create Post Button styled like other links */}
        <div
          onClick={() => setOpen(true)}
          className="flex items-center px-4 py-3 hover:bg-gray-100 transition duration-200 ease-in-out cursor-pointer"
        >
          <PlusSquare className="text-gray-700" />
          <span className="ml-4 text-base font-medium text-gray-800">
            Create
          </span>
        </div>
      </div>
      <div className="border-t p-4">
        {isLoggedIn ? (
          <Link to="/profile">
            <Button className="w-full">Profile</Button>
          </Link>
        ) : (
          <Link to="/login">
            <Button className="w-full">Log In</Button>
          </Link>
        )}
      </div>
      {/* Create Post Dialog */}
      <CreatePost open={open} setOpen={setOpen} />
    </div>
  );
};

export default LeftSidebar;
