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
import axios from "axios";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { removePost } from "@/redux/postSlice";

const PostControlsDialog = ({ post, onClose }) => {
  const { user, authenticationToken } = useAuth();
  const dispatch = useDispatch();

  const deletePostHandler = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:4000/api/post/delete/${post._id}`,
        {
          headers: {
            Authorization: authenticationToken,
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);

        // Dispatch action to remove post from Redux state
        dispatch(removePost(post._id));

        onClose(); // Close the dialog after deletion
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

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
            <Button
              variant="destructive"
              onClick={deletePostHandler}
              className="w-full justify-start"
            >
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
