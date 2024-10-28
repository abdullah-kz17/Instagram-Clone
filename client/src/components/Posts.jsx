import React, { useState } from "react";
import { useSelector } from "react-redux";
import Post from "./Post";
import PostControlsDialog from "./PostControlsDialog";
import CommentDialog from "./CommentsDialog";

const Posts = () => {
  const { posts } = useSelector((state) => state.post);
  const [selectedPost, setSelectedPost] = useState(null); // Track which post's dialog to open

  return (
    <div className="max-w-xl mx-auto py-8">
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post._id}>
            <Post post={post} onOpenDialog={() => setSelectedPost(post)} />
            {selectedPost && selectedPost._id === post._id && (
              <>
                <PostControlsDialog
                  post={selectedPost}
                  onClose={() => setSelectedPost(null)}
                />
              </>
            )}
          </div>
        ))
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
};

export default Posts;
