import React from "react";
import { useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"; // Assuming you have these components
import { Button } from "./ui/button"; // Assuming you have a button component
import { Link } from "react-router-dom";

const SuggestedUsers = () => {
  const { suggestedUser } = useSelector((state) => state.auth);

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <ul className="space-y-3">
        {suggestedUser.map((user) => (
          <li key={user._id} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link to={`/profile/${user._id}`}>
                <Avatar>
                  <AvatarImage
                    src={user.profilePicture}
                    alt={user.username}
                    className="h-10 w-10 rounded-full border-2 border-gray-300"
                  />
                  <AvatarFallback>
                    {user.username[0]?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              </Link>
              <span className="font-medium text-base">{user.username}</span>
            </div>
            <Button className="text-xs">Follow</Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SuggestedUsers;
