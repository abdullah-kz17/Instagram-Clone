const Comment = require("../models/commentModel");
const Post = require("../models/postModel");

// Create Comment
const createComment = async (req, res) => {
  try {
    const { text, postId } = req.body;
    const { userId } = req.user;

    // Validate input
    if (!text || !postId) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    // Create new comment
    const comment = new Comment({ text, author: userId, post: postId });
    await comment.save();

    // Update post's comments array
    const post = await Post.findByIdAndUpdate(
      postId,
      { $push: { comments: comment._id } },
      { new: true }
    );

    res.json({
      message: "Comment created successfully",
      success: true,
      comment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

// Get All Comments
const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find().populate("author post");

    res.json({
      message: "Comments retrieved successfully",
      success: true,
      comments,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

// Get Comment By Id
const getCommentById = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findById(id).populate("author post");

    if (!comment) {
      return res
        .status(404)
        .json({ message: "Comment not found", success: false });
    }

    res.json({
      message: "Comment retrieved successfully",
      success: true,
      comment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

// Update Comment
const updateCommentById = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;

    const updatedComment = await Comment.findByIdAndUpdate(
      id,
      { text },
      { new: true }
    );

    if (!updatedComment) {
      return res
        .status(404)
        .json({ message: "Comment not found", success: false });
    }

    res.json({
      message: "Comment updated successfully",
      success: true,
      comment: updatedComment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

// Delete Comment

const deleteCommentById = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findByIdAndDelete(id);

    if (!comment) {
      return res
        .status(404)
        .json({ message: "Comment not found", success: false });
    }

    res.json({
      message: "Comment deleted successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

module.exports = {
  createComment,
  getAllComments,
  getCommentById,
  updateCommentById,
  deleteCommentById,
};
