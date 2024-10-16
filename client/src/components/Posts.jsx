import React, { useState } from "react";
import {
  MoreHorizontal,
  Heart,
  MessageCircle,
  Bookmark,
  Share,
  Send,
} from "lucide-react";
import CommentDialog from "./CommentsDialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "./ui/card";
import { Input } from "@/components/ui/input";
import { useSelector } from "react-redux";

const Post = ({ post }) => {
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
      // Add comment logic here
      setCommentText("");
      setOpenComments(true);
    }
  };

  return (
    <Card className="mb-6">
      {/* CardHeader */}
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
          <span className="font-semibold">{post.author.name}</span>{" "}
          {post.caption}
        </p>
        <p>{post.comments[0]?.content || "No comments yet!"}</p>
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
          {commentText && <span className="text-blue-500">Post</span>}
        </form>
      </CardFooter>

      <div className="mt-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setOpenComments(!openComments)}
        >
          <MessageCircle
            className={`h-6 w-6 ${openComments ? "fill-current" : ""}`}
          />
        </Button>
        {openComments && (
          <CommentDialog
            comments={post.comments}
            onClose={() => setOpenComments(false)}
            openComments={openComments}
            setOpenComments={setOpenComments}
          />
        )}
      </div>
    </Card>
  );
};

const InstagramFeed = () => {
  return (
    <div className="max-w-xl mx-auto py-8">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default InstagramFeed;
