import { Button } from "./ui/button";
import { Dialog, DialogHeader } from "./ui/dialog";
import { DialogContent } from "./ui/dialog";
import { DialogTitle } from "./ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/store/AuthContext";
import { setPosts } from "@/redux/postSlice";

const CommentDialog = ({ openComments, setOpenComments, onClose }) => {
  const { authenticationToken } = useAuth();
  const dispatch = useDispatch();
  const [commentText, setCommentText] = useState("");
  const { selectedPosts, posts } = useSelector((state) => state.post);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (selectedPosts) {
      setComments(selectedPosts.comments);
    }
  }, [selectedPosts]);

  const commentHandler = async () => {
    if (!commentText.trim()) {
      toast.error("Comment text is required");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:4000/api/post/${selectedPosts._id}/comment`,
        { text: commentText },
        {
          headers: {
            Authorization: authenticationToken,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        const newComment = response.data.comment;
        setComments((prevComments) => [...prevComments, newComment]);
        dispatch(
          setPosts(
            posts.map((p) =>
              p._id === selectedPosts._id
                ? { ...p, comments: [...p.comments, newComment] }
                : p
            )
          )
        );
        toast.success(response.data.message);
        setCommentText("");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      console.error(error);
    }
  };

  return (
    <Dialog open={openComments} onOpenChange={setOpenComments}>
      <DialogContent
        className="p-0 h-auto max-w-4xl flex flex-col"
        onInteractOutside={() => setOpenComments(false)}
      >
        <div className="flex justify-between items-center mb-4">
          <DialogTitle>Comments</DialogTitle>
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </div>

        <div className="flex space-x-4 flex-1 ">
          <div className="w-1/2 pr-4">
            <img
              src={selectedPosts?.image}
              alt="Post content"
              className="w-full h-full object-cover shadow-md rounded-lg"
            />
          </div>
          <div className="w-1/2 overflow-y-auto max-h-96">
            <DialogHeader>
              <div className="flex items-center space-x-2 mb-4">
                {selectedPosts?.author && (
                  <>
                    <Avatar>
                      <AvatarImage
                        src={selectedPosts.author.profilePicture}
                        alt={selectedPosts.author.username}
                        className="h-8 w-8 rounded-full"
                      />
                      <AvatarFallback>
                        {selectedPosts.author.username?.[0]?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-semibold">
                      {selectedPosts.author.username}
                    </span>
                  </>
                )}
              </div>
              {/* <div className="flex items-center space-x-2">
                <span>
                  {new Date(selectedPosts?.createdAt).toLocaleString()}
                </span>
              </div> */}
            </DialogHeader>
            <ul className="space-y-2">
              {comments.map((comment) => (
                <li
                  key={comment._id}
                  className="flex items-start space-x-2 border-b py-2"
                >
                  {comment.author && (
                    <>
                      <Avatar>
                        <AvatarImage
                          src={comment.author.profilePicture}
                          alt={comment.author.username}
                          className="h-8 w-8 rounded-full"
                        />
                        <AvatarFallback>
                          {comment.author.username?.[0]?.toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <span className="font-semibold">
                          {comment.author.username}
                        </span>
                        <span className="block text-gray-600">
                          {comment.text}
                        </span>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex items-center justify-between mt-4">
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add a comment..."
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-primary"
          />
          <Button variant="primary" onClick={commentHandler}>
            Comment
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommentDialog;
