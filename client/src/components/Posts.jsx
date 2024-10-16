import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "./Post"; // Assuming Post is in a separate file

const Posts = () => {
  const { posts } = useSelector((state) => state.post);

  return (
    <div className="max-w-xl mx-auto py-8">
      {posts.length > 0 ? (
        posts.map((post) => <Post key={post._id} post={post} />)
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
};

export default Posts;
