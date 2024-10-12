const Post = require("../models/postModel");
 
// Create Post
 const createPost = async (req, res) => {
   try {
     const { caption, image } = req.body;
     const { userId } = req.user;
 
     // Validate input
     if (!caption || !image) {
       return res
         .status(400)
         .json({ message: "Caption and image are required", success: false });
     }
 
     const newPost = new Post({ caption, image, author: userId });
     await newPost.save();
 
     res.json({ message: "Post created successfully", success: true, post: newPost });
   } catch (error) {
     console.error(error);
     res.status(500).json({ message: "Server error", success: false });
   }
};
 
// Get All Posts
 const getAllPosts = async (req, res) => {
   try {
     const posts = await Post.find().sort({ createdAt: -1 });
     res.json({ message: "Posts fetched successfully", success: true, posts });
   } catch (error) {
     console.error(error);
     res.status(500).json({ message: "Server error", success: false });
   }
};
 
// Get Post By Id
 const getPostById = async (req, res) => {
   try {
     const post = await Post.findById(req.params.id);
 
     if (!post) {
       return res
         .status(404)
         .json({ message: "Post not found", success: false });
     }
 
     res.json({ message: "Post fetched successfully", success: true, post });
   } catch (error) {
     console.error(error);
     res.status(500).json({ message: "Server error", success: false });
   }
};

// Update Post By Id
const updatePostById = async (req, res) => {
    try {
        const { caption, image } = req.body;
        const { id } = req.params;
        const { userId } = req.user;
 
        // Validate input
        if (!caption && !image) {
            return res
                .status(400)
                .json({ message: "Caption and image are required", success: false });
        }
 
        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { caption, image },
            { new: true }
        );
 
        if (!updatedPost) {
            return res
                .status(404)
                .json({ message: "Post not found", success: false });
        }
 
        res.json({ message: "Post updated successfully", success: true, post: updatedPost });
    } catch (error) {
        console.error(error);
        res.status(50
            .json({ message: "Server error", success: false });
    }
}

// Delete Post By Id
 const deletePostById = async (req, res) => {
   try {
     const { id } = req.params;
     const { userId } = req.user;
 
     const deletedPost = await Post.findByIdAndDelete(id);
 
     if (!deletedPost) {
       return res
         .status(404)
         .json({ message: "Post not found", success: false });
     }
 
     res.json({ message: "Post deleted successfully", success: true });
   } catch (error) {
     console.error(error);
     res.status(500).json({ message: "Server error", success: false });
   }
};

module.exports = { createPost, getAllPosts, getPostById, updatePostById, deletePostById };