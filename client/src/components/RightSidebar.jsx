import { useAuth } from "@/store/AuthContext";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link } from "react-router-dom";
import SuggestedUsers from "./SuggestedUsers";

const RightSidebar = () => {
  const { user } = useAuth();

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg flex flex-col ml-4">
      {/* User Profile Section */}
      <Link
        to={`/profile/${user?.userData._id}`}
        className="flex items-center mb-4"
      >
        <Avatar>
          <AvatarImage
            src={user?.userData.profilePicture}
            alt={user?.userData.username}
            className="h-12 w-12 rounded-full border-2 border-gray-300"
          />
          <AvatarFallback>
            {user?.userData.username[0]?.toUpperCase() || "U"}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col ms-3">
          <h1 className="font-semibold text-lg">{user?.userData.username}</h1>
          <span className="text-gray-600 text-sm">{user?.userData.bio}</span>
        </div>
      </Link>

      {/* Suggested Users Section */}
      <div className="mt-4">
        <h2 className="font-semibold text-md mb-2">Suggested for You</h2>
        <SuggestedUsers />
      </div>
    </div>
  );
};

export default RightSidebar;
