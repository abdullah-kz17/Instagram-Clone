const sharp = require("sharp");
const Post = require("../models/postModel");
const cloudinary = require("../config/cloudinary");
const User = require("../models/userModel");
const Comment = require("../models/commentModel");
const mongoose = require("mongoose");

// Create Post
const createPost = async (req, res) => {
  try {
    const { caption } = req.body;
    const image = req.file;
    const authorId = req.id;

    // Validate input
    if (!caption || !image) {
      return res
        .status(400)
        .json({ message: "Caption and image are required", success: false });
    }

    // Optimize image using sharp
    const optimizedImageBuffer = await sharp(image.buffer)
      .resize({ height: 800, width: 800, fit: "inside" })
      .toFormat("jpeg", { quality: 80 })
      .toBuffer();

    // Convert buffer to data URI
    const optimizedImageBufferUri = `data:image/jpeg;base64,${optimizedImageBuffer.toString(
      "base64"
    )}`;

    // Upload to Cloudinary
    const cloudResponse = await cloudinary.uploader.upload(
      optimizedImageBufferUri
    );

    // Create post
    const post = await Post.create({
      caption,
      image: cloudResponse.secure_url,
      author: authorId,
    });

    // Update user's posts array
    const user = await User.findById(authorId);
    if (user) {
      user.posts.push(post._id);
      await user.save();
    }

    await post.populate({ path: "author", select: "-password" });

    return res.json({
      message: "Post created successfully",
      success: true,
      post,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

// Get All Posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate({ path: "author", select: "username profilePicture" })
      .populate({
        path: "comments",
        sort: { createdAt: -1 },
        populate: { path: "author", select: "username profilePicture" },
      });

    return res.json({
      message: "Posts fetched successfully",
      success: true,
      posts,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

// Get User Posts by Author ID
const getUserPost = async (req, res) => {
  try {
    const authorId = req.id; // Assuming this is set by auth middleware

    const posts = await Post.find({ author: authorId })
      .sort({ createdAt: -1 })
      .populate({ path: "author", select: "username profilePicture" })
      .populate({
        path: "comments",
        sort: { createdAt: -1 },
        populate: { path: "author", select: "username profilePicture" },
      });

    if (!posts.length) {
      return res
        .status(404)
        .json({ message: "No posts found", success: false });
    }

    return res.json({
      message: "User posts fetched successfully",
      success: true,
      posts,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

// Like Post
const likePost = async (req, res) => {
  try {
    const userId = req.id;
    const postId = req.params.id;

    const post = await Post.findById(postId);

    if (!post) {
      return res
        .status(404)
        .json({ message: "Post not found", success: false });
    }

    // Like logic add to set means post can only be liked once
    await post.updateOne({ $addToSet: { likes: userId } });

    return res
      .status(200)
      .json({ message: "Post liked successfully", success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

// Dislike Post
const dislikePost = async (req, res) => {
  try {
    const userId = req.id;
    const postId = req.params.id;

    const post = await Post.findById(postId);

    if (!post) {
      return res
        .status(404)
        .json({ message: "Post not found", success: false });
    }

    // Dislike logic
    await post.updateOne({ $pull: { likes: userId } });

    return res
      .status(200)
      .json({ message: "Post disliked successfully", success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

// Add Comment
const addComment = async (req, res) => {
  try {
    const userId = req.id;
    const postId = req.params.id;

    const { text } = req.body;

    if (!text) {
      return res
        .status(400)
        .json({ message: "Comment text is required", success: false });
    }

    const post = await Post.findById(postId);

    if (!post) {
      return res
        .status(404)
        .json({ message: "Post not found", success: false });
    }

    const comment = new Comment({
      text,
      author: userId,
      post: postId,
    });

    await comment.save();

    // Update post's comments array
    await post.updateOne({ $push: { comments: comment._id } });

    return res.status(200).json({
      message: "Comment added successfully",
      success: true,
      comment,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

// Get Comments by Post ID
const getCommentsByPosts = async (req, res) => {
  try {
    const postId = req.params.id;
    const comments = await Comment.find({ post: postId }).populate(
      "author",
      "username profilePicture"
    );

    if (!comments.length) {
      return res.status(404).json({
        message: "No comments found for this post",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Comments fetched successfully",
      success: true,
      comments,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

// Update Post By Id
const updatePostById = async (req, res) => {
  try {
    const { caption, image } = req.body;
    const { id } = req.params;

    // Validate input
    if (!caption && !image) {
      return res.status(400).json({
        message: "Caption or image is required",
        success: false,
      });
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { caption, image },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({
        message: "Post not found",
        success: false,
      });
    }

    return res.json({
      message: "Post updated successfully",
      success: true,
      post: updatedPost,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

// Delete Post By Id
const deletePostById = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.id;

    const post = await Post.findById(postId);

    if (!post || post.author.toString() !== userId) {
      return res.status(403).json({
        message: "You are not authorized to delete this post",
        success: false,
      });
    }

    await Post.findByIdAndDelete(postId);

    // Update user's posts array
    let user = await User.findById(userId);
    user.posts = user.posts.filter((p) => p.toString() !== postId);
    await user.save();

    // Delete associated comments
    await Comment.deleteMany({ post: postId });

    if (!deletedPost) {
      return res.status(404).json({
        message: "Post not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Post deleted successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

// Bookmark Post
const bookmarkPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const authorId = req.id;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
        success: false,
      });
    }

    // Check if user already bookmarked the post
    let user = await User.findById(authorId);

    if (user.bookmarks.includes(post._id)) {
      await user.updateOne({ $pull: { bookmarks: post._id } });
      await user.save();
      return res.status(200).json({
        message: "Post unbookmarked successfully",
        success: true,
      });
    } else {
      await user.updateOne({ $push: { bookmarks: post._id } });
      await user.save();
      return res.status(200).json({
        message: "Post bookmarked successfully",
        success: true,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getUserPost,
  likePost,
  dislikePost,
  addComment,
  getCommentsByPosts,
  updatePostById,
  deletePostById,
  bookmarkPost,
};
