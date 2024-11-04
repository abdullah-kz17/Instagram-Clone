import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Grid, Settings, Bookmark, ImageIcon } from "lucide-react";
import { useAuth } from "@/store/AuthContext";
import { useSelector } from "react-redux";
import useGetUserProfile from "@/hooks/useGetUserProfile";
import { Link, useParams } from "react-router-dom";

const Profile = () => {
  const { user } = useAuth();
  const params = useParams();
  const userId = params.id;
  useGetUserProfile(userId);

  const { userProfile } = useSelector((state) => state.auth);
  const isLoggedInUserProfile = user?.userData?._id === userProfile?._id;

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-8 mb-8">
        <Avatar className="w-32 h-32">
          <AvatarImage
            src={
              userProfile?.profilePicture === "default_profile_picture.jpg"
                ? "/default-avatar.png"
                : userProfile?.profilePicture
            }
            alt={userProfile?.username}
          />
          <AvatarFallback>
            {userProfile?.username?.[0]?.toUpperCase() || "?"}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <div className="flex items-center gap-4 mb-4">
            <h1 className="text-2xl font-semibold">
              {userProfile?.username || "Username"}
            </h1>
            <div className="flex gap-2">
              {isLoggedInUserProfile ? (
                <Link to="/profile/edit">
                  <Button variant="ghost" size="small">
                    Edit Profile
                  </Button>
                </Link>
              ) : (
                <Button>Follow</Button>
              )}
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-8 mb-4">
            <div className="text-center">
              <span className="font-semibold">
                {userProfile?.posts?.length || 0}
              </span>
              <span className="text-muted-foreground ml-1">posts</span>
            </div>
            <div className="text-center">
              <span className="font-semibold">
                {userProfile?.followers?.length || 0}
              </span>
              <span className="text-muted-foreground ml-1">followers</span>
            </div>
            <div className="text-center">
              <span className="font-semibold">
                {userProfile?.following?.length || 0}
              </span>
              <span className="text-muted-foreground ml-1">following</span>
            </div>
          </div>

          {/* Bio */}
          <div>
            <p className="text-sm text-muted-foreground">
              {userProfile?.bio || "No bio yet"}
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
          {userProfile?.posts && userProfile?.posts.length > 0 ? (
            <div className="grid grid-cols-3 gap-1">
              {userProfile.posts.map((post) => (
                <div key={post._id} className="aspect-square bg-muted">
                  <img
                    src={post.image || "/default-thumbnail.png"}
                    alt=""
                    className="object-cover w-full h-full"
                  />
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
          {userProfile?.bookmarks && userProfile?.bookmarks.length > 0 ? (
            <div className="grid grid-cols-3 gap-1">
              {userProfile.bookmarks.map((bookmark, index) => (
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
