import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { MoreHorizontal } from "lucide-react";
import { useAuth } from "@/store/AuthContext";
import { useSelector } from "react-redux";

const PostControlsDialog = () => {
  const { user } = useAuth();
  const { posts } = useSelector((state) => state.post);
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Post Options</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <Button variant="ghost" className="w-full justify-start">
              Edit Post
            </Button>
            {user && user?._id === posts?.author?._id && (
              <Button variant="destructive" className="w-full justify-start">
                Delete
              </Button>
            )}

            <Button variant="ghost" className="w-full justify-start">
              Share
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Report
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PostControlsDialog;
