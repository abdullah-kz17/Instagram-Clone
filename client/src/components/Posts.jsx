import React, { useState } from "react";
import {
  MoreHorizontal,
  Heart,
  MessageCircle,
  Bookmark,
  Share,
} from "lucide-react";
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
  const [commentText, setCommentText] = useState("");

  const handleLike = () => setLiked(!liked);
  const handleSave = () => setSaved(!saved);
  const handleComment = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      console.log("New comment:", commentText);
      setCommentText("");
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center space-x-4 p-4">
        <Avatar>
          <AvatarImage src={post.author.avatar} alt={post.author.name} />
          <AvatarFallback>{post.author.name[0]}</AvatarFallback>
        </Avatar>
        <span className="font-semibold">{post.author.name}</span>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon" className="">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Post options</DialogTitle>
            </DialogHeader>
            <div className="space-y-2">
              <Button variant="ghost" className="w-full justify-start">
                Report
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                Unfollow
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                Add to favorites
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                Go to post
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                Share
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                Copy link
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                Embed
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                Cancel
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
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
            <Button variant="ghost" size="icon">
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
        {post.comments.map((comment, index) => (
          <p key={index}>
            <span className="font-semibold">{comment.author}</span>{" "}
            {comment.content}
          </p>
        ))}
        <form onSubmit={handleComment} className="w-full mt-2">
          <Input
            type="text"
            placeholder="Add a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
        </form>
      </CardFooter>
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
