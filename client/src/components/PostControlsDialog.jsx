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

const PostControlsDialog = ({ post, onClose }) => {
  const { user } = useAuth();

  return (
    <Dialog open={!!post} onOpenChange={onClose}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent aria-labelledby="post-options-dialog-title">
        <DialogHeader>
          <DialogTitle id="post-options-dialog-title">Post Options</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          <Button variant="ghost" className="w-full justify-start">
            Edit Post
          </Button>

          {/* Show Delete button only if the user is the author of the post */}
          {user && user.userData?._id === post?.author?._id && (
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
  );
};

export default PostControlsDialog;
