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
import PostControlsDialog from "./PostControlsDialog";

const Post = ({ post, onOpenDialog }) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [openComments, setOpenComments] = useState(false);
  const [commentText, setCommentText] = useState("");

  const handleLike = () => setLiked(!liked);
  const handleSave = () => setSaved(!saved);

  const handleComment = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      console.log("New comment:", commentText);
      setCommentText("");
      setOpenComments(true); // Open comments dialog after adding a comment
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

        {/* Likes and Caption */}
        {post?.likes.length > 0 && (
          <p className="font-semibold">{post?.likes.length} likes</p>
        )}
        {post?.caption && (
          <p>
            <span className="font-bold">{post?.author.username}</span>{" "}
            {post?.caption}
          </p>
        )}

        {/* Comments Section */}
        {post.comments.length > 0 ? (
          <Button variant="ghost" onClick={() => setOpenComments(true)}>
            View all {post?.comments.length} comments
          </Button>
        ) : (
          <p>No comments yet!</p>
        )}

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
