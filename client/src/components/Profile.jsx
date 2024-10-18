import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card, CardHeader, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Grid, Settings, Bookmark, ImageIcon } from "lucide-react";
import { useAuth } from "@/store/AuthContext";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useAuth();
  const { posts } = useSelector((state) => state.post);
  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-8 mb-8">
        <Avatar className="w-32 h-32">
          <AvatarImage
            src={
              user?.userData.profilePicture === "default_profile_picture.jpg"
                ? "/default-avatar.png"
                : user?.userData.profilePicture
            }
            alt={user?.userData.username}
          />
          <AvatarFallback>
            {user?.userData.username[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <div className="flex items-center gap-4 mb-4">
            <h1 className="text-2xl font-semibold">
              {user?.userData.username}
            </h1>
            <div className="flex gap-2">
              <Button variant="outline">Edit Profile</Button>
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-8 mb-4">
            <div className="text-center">
              <span className="font-semibold">
                {user?.userData.posts?.length || 0}
              </span>
              <span className="text-muted-foreground ml-1">posts</span>
            </div>
            <div className="text-center">
              <span className="font-semibold">
                {user?.userData.followers?.length || 0}
              </span>
              <span className="text-muted-foreground ml-1">followers</span>
            </div>
            <div className="text-center">
              <span className="font-semibold">
                {user?.userData.following?.length || 0}
              </span>
              <span className="text-muted-foreground ml-1">following</span>
            </div>
          </div>

          {/* Bio */}
          <div>
            <p className="text-sm text-muted-foreground">
              {user?.userData.bio || "No bio yet"}
            </p>
          </div>
        </div>
      </div>

      <Separator className="my-8" />

      {/* Tabs */}
      <Tabs defaultValue="posts" className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-[400px] mx-auto">
          <TabsTrigger value="posts" className="flex items-center gap-2">
            <Grid className="w-4 h-4" />
            <span className="hidden sm:inline">Posts</span>
          </TabsTrigger>
          <TabsTrigger value="saved" className="flex items-center gap-2">
            <Bookmark className="w-4 h-4" />
            <span className="hidden sm:inline">Saved</span>
          </TabsTrigger>
          <TabsTrigger value="tagged" className="flex items-center gap-2">
            <ImageIcon className="w-4 h-4" />
            <span className="hidden sm:inline">Tagged</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="posts">
          {posts && posts.length > 0 ? (
            <div className="grid grid-cols-3 gap-1">
              {posts.map((post) => (
                <div key={post._id} className="aspect-square bg-muted">
                  {/* Post thumbnail would go here */}
                  <div>
                    <img src={post.image} alt="" className="object-cover" />
                  </div>
                  {/* <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon className="w-8 h-8 text-muted-foreground" />
                  </div> */}
                </div>
              ))}
            </div>
          ) : (
            <Card className="mt-4">
              <CardContent className="flex flex-col items-center justify-center py-8">
                <ImageIcon className="w-16 h-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Posts Yet</h3>
                <p className="text-muted-foreground text-center">
                  When you share photos, they'll appear here.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="saved">
          {user?.userData.bookmarks && user?.userData.bookmarks.length > 0 ? (
            <div className="grid grid-cols-3 gap-1">
              {user?.userData.bookmarks.map((bookmark, index) => (
                <div key={index} className="aspect-square bg-muted">
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon className="w-8 h-8 text-muted-foreground" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <Card className="mt-4">
              <CardContent className="flex flex-col items-center justify-center py-8">
                <Bookmark className="w-16 h-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Saved Posts</h3>
                <p className="text-muted-foreground text-center">
                  Save photos and videos that you want to see again.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="tagged">
          <Card className="mt-4">
            <CardContent className="flex flex-col items-center justify-center py-8">
              <ImageIcon className="w-16 h-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Tagged Posts</h3>
              <p className="text-muted-foreground text-center">
                When people tag you in photos, they'll appear here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
