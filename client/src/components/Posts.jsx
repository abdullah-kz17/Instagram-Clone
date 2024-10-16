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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

const posts = [
  {
    id: 1,
    author: { name: "johndoe", avatar: "https://github.com/shadcn.png" },
    image:
      "https://images.unsplash.com/photo-1496449903678-68ddcb189a24?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YmxvZ3xlbnwwfHwwfHx8MA%3D%3D",
    caption: "Beautiful sunset at the beach!",
    likes: 120,
    comments: [
      { author: "jane_smith", content: "Wow, what a view!" },
      { author: "travel_enthusiast", content: "I need to visit this place!" },
    ],
  },
  {
    id: 2,
    author: { name: "janedoe", avatar: "https://github.com/shadcn.png" },
    image:
      "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGJsb2d8ZW58MHx8MHx8fDA%3D",
    caption: "Exploring the mountains!",
    likes: 85,
    comments: [
      { author: "mountain_lover", content: "The peaks look amazing!" },
      { author: "nature_photographer", content: "Great composition!" },
    ],
  },
];

const Post = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [openComments, setOpenComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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
