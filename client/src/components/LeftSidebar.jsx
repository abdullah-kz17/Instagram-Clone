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
import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { useAuth } from "@/store/AuthContext";

const LeftSidebar = () => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate(); // Initialize useNavigate

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
    { icon: <PlusSquare />, text: "Create", path: "/create" },
    {
      icon: (
        <Avatar className="w-7 h-7">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      ),
      text: "Profile",
      path: "/profile",
    },
    {
      icon: <LogOut />,
      text: "Logout",
      path: "/logout",
      onClick: handleLogout, // Add onClick handler for logout
    },
  ];

  return (
    <div className="flex flex-col bg-white shadow-md w-64 h-screen">
      <div className="flex items-center justify-center py-4 border-b">
        <h1 className="text-xl font-bold">Instagram</h1>
      </div>
      <div className="flex-grow overflow-y-auto">
        {sidebarItems.map((item, index) => (
          <div key={index}>
            {item.text === "Logout" ? (
              <div
                onClick={item.onClick} // Use onClick for logout item
                className="flex items-center px-4 py-3 hover:bg-gray-100 transition duration-200 ease-in-out cursor-pointer"
              >
                <div className="text-gray-700">{item.icon}</div>
                <span className="ml-4 text-base font-medium text-gray-800">
                  {item.text}
                </span>
              </div>
            ) : (
              <Link to={item.path}>
                <div className="flex items-center px-4 py-3 hover:bg-gray-100 transition duration-200 ease-in-out cursor-pointer">
                  <div className="text-gray-700">{item.icon}</div>
                  <span className="ml-4 text-base font-medium text-gray-800">
                    {item.text}
                  </span>
                </div>
              </Link>
            )}
          </div>
        ))}
      </div>
      <div className="border-t p-4">
        {isLoggedIn ? (
          <Link to="/profile">
            <span className="w-full block text-center bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200">
              Profile
            </span>
          </Link>
        ) : (
          <Link to="/login">
            <span className="w-full block text-center bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200">
              Log In
            </span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default LeftSidebar;
