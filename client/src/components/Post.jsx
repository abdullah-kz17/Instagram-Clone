import React, { useState } from "react";
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
import { useAuth } from "@/store/AuthContext";
import { useSelector } from "react-redux";
import PostControlsDialog from "./PostControlsDialog";

const Post = ({ post }) => {
  const { user } = useAuth();
  const { posts } = useSelector((state) => state.post);

  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [openComments, setOpenComments] = useState(false);
  const [commentText, setCommentText] = useState("");

  const handleLike = () => setLiked(!liked);
  const handleSave = () => setSaved(!saved);

  const handleComment = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      // Add comment logic here (e.g., dispatch an action to add comment)
      console.log("New comment:", commentText);
      setCommentText("");
      setOpenComments(true); // Open comments dialog after adding a comment
    }
  };

  return (
    <Card className="mb-6">
      {/* Card Header */}
      <CardHeader>
        {/* Avatar */}
        <div className="flex items-center space-x-2">
          <Avatar>
            <AvatarImage
              src={post.author.profilePicture}
              alt={post.author.username || "User"}
            />
          </Avatar>
          <div>
            <span className="font-semibold">{post.author.username}</span>
            <span className="text-gray-500 ml-2 text-xs">{post.createdAt}</span>
          </div>
          <div className="">
            <PostControlsDialog />
          </div>
        </div>
      </CardHeader>
      {/* Card Content */}
      <CardContent className="p-0">
        <img src={post.image} alt="Post content" className="w-full" />
      </CardContent>
      <CardFooter className="flex flex-col items-start p-4">
        <div className="flex w-full justify-between mb-2">
          <div className="flex space-x-4">
            <Button variant="ghost" size="icon" onClick={handleLike}>
              <Heart
                className={`h-6 w-6 ${
                  liked ? "fill-red-500 text-red-500" : ""
                }`}
              />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpenComments(true)}
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
        <p className="font-semibold">{post.likes} likes</p>
        <p>
          <span className="font-bold">{post.author.username}</span>
          <span className="font-semibold">{post.author.name}</span>{" "}
          {post.caption}
        </p>
        {/* Display first comment or a message if no comments */}
        <p>{post.comments[0]?.content || "No comments yet!"}</p>
        {/* Comment Input */}
        <form
          onSubmit={handleComment}
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
      </CardFooter>

      {/* Comments Dialog */}
      {openComments && (
        <CommentDialog
          comments={post.comments}
          onClose={() => setOpenComments(false)}
          openComments={openComments}
          setOpenComments={setOpenComments}
        />
      )}
    </Card>
  );
};

export default Post;
