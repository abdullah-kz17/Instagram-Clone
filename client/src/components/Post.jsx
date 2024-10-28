import React, { useState, useEffect } from "react";
import {
  Heart,
  MessageCircle,
  Bookmark,
  Share,
  MoreHorizontal,
} from "lucide-react";
import CommentDialog from "./CommentsDialog"; // Ensure this is correctly imported
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Input } from "@/components/ui/input";
import PostControlsDialog from "./PostControlsDialog";
import axios from "axios";
import { useAuth } from "@/store/AuthContext";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setPosts, setSelectedPosts } from "@/redux/postSlice";

const Post = ({ post, onOpenDialog }) => {
  const { user, authenticationToken } = useAuth();
  const { posts } = useSelector((state) => state.post);

  const [liked, setLiked] = useState(post.likes.includes(user?._id) || false);
  const [saved, setSaved] = useState(false);
  const [openComments, setOpenComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [postLike, setPostLike] = useState(post?.likes?.length);
  const [comment, setComment] = useState(post.comments);

  useEffect(() => {
    setLiked(post.likes.includes(user?._id) || false);
    setPostLike(post.likes.length);
  }, [post, user]);

  const handleLike = () => setLiked(!liked);
  const handleSave = () => setSaved(!saved);
  const dispatch = useDispatch();

  const likeDislike = async () => {
    try {
      const action = liked ? "dislike" : "like";
      const response = await axios.get(
        `http://localhost:4000/api/post/${post._id}/${action}`,
        {
          headers: {
            Authorization: authenticationToken,
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        const updatedLikes = liked ? postLike - 1 : postLike + 1;
        setPostLike(updatedLikes);
        toast.success(response.data.message);
        setLiked(!liked);

        // Update the local state to reflect the new likes
        const updatedPostData = posts.map((p) =>
          p._id === post._id
            ? {
                ...p,
                likes: liked
                  ? p.likes.filter((id) => id !== user?._id)
                  : [...p.likes, user?._id],
              }
            : p
        );
        dispatch(setPosts(updatedPostData));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      console.error(error);
    }
  };

  const commentHandler = async () => {
    if (!commentText.trim()) {
      toast.error("Comment text is required");
      return; // Prevent proceeding if comment text is empty
    }

    try {
      const response = await axios.post(
        `http://localhost:4000/api/post/${post._id}/comment`,
        { text: commentText }, // Ensure you send { text: commentText }
        {
          headers: {
            Authorization: authenticationToken,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        // Add the new comment to the local state
        const updatedCommentData = [...comment, response.data.comment]; // Use the comment returned from the server
        setComment(updatedCommentData);

        // Update the post in the Redux store
        const updatedPostData = posts.map((p) =>
          p._id === post._id ? { ...p, comments: updatedCommentData } : p
        );
        dispatch(setPosts(updatedPostData));
        toast.success(response.data.message);
        setCommentText(""); // Clear the input field
        setOpenComments(true); // Open comments dialog to show new comment
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      console.error(error);
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Avatar>
              <AvatarImage
                src={post?.author?.profilePicture}
                alt={post?.author?.username || "User"}
              />
              <AvatarFallback>
                {post?.author?.username?.[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <span className="font-semibold">{post?.author?.username}</span>
              <span className="text-gray-500 ml-2 text-xs">
                {new Date(post?.createdAt).toLocaleString()}
              </span>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onOpenDialog}>
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {post?.image && (
          <img
            src={post.image}
            alt="Post content"
            className="w-full object-cover"
            onError={(e) => {
              e.target.src = "/fallback-image.jpg"; // Add a fallback image
              e.target.onerror = null;
            }}
          />
        )}
      </CardContent>

      <CardFooter className="flex flex-col items-start p-4">
        {/* Like and Comment Buttons */}
        <div className="flex w-full justify-between mb-2">
          <div className="flex space-x-4">
            <Button variant="ghost" size="icon" onClick={likeDislike}>
              <Heart
                className={`h-6 w-6 ${
                  liked ? "fill-red-500 text-red-500" : ""
                }`}
              />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                dispatch(setSelectedPosts(post));
                setOpenComments(true);
              }}
            >
              <MessageCircle className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon">
              <Share className="h-6 w-6" />
            </Button>
          </div>
          <Button variant="ghost" size="icon" onClick={handleSave}>
            <Bookmark className={`h-6 w-6 ${saved ? "fill-current" : ""}`} />
          </Button>
        </div>

        {/* Likes and Caption */}
        <div className="flex items-center">
          {postLike && <p className="font-semibold">{postLike} likes</p>}
        </div>

        {post?.caption && (
          <p>
            <span className="font-bold">{post?.author.username}</span>{" "}
            {post?.caption}
          </p>
        )}

        {/* Comments Section */}
        {post.comments.length > 0 ? (
          <Button
            variant="ghost"
            onClick={() => {
              dispatch(setSelectedPosts(post));
              setOpenComments(true);
            }}
          >
            View all {post?.comments.length} comments
          </Button>
        ) : (
          <p>No comments yet!</p>
        )}

        {/* Comment Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault(); // Prevent default form submission
            commentHandler(); // Call comment handler
          }}
          className="w-full mt-2 flex items-center"
        >
          <Input
            type="text"
            placeholder="Add a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="w-full px-4 py-2 border-none rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {commentText && (
            <Button type="submit" variant="primary" className="ml-2">
              Post
            </Button>
          )}
        </form>

        {/* Comments Dialog */}
        {openComments && (
          <CommentDialog
            comments={post?.comments}
            onClose={() => setOpenComments(false)}
            openComments={openComments}
            setOpenComments={setOpenComments}
          />
        )}
      </CardFooter>
    </Card>
  );
};

export default Post;
