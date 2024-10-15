const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/multer");

router.post(
  "/addpost",
  authMiddleware,
  upload.single("image"),
  postController.createPost
);
router.get("/all", authMiddleware, postController.getAllPosts);
router.get("/userpost/all", authMiddleware, postController.getUserPost);
router.get("/:id/like", authMiddleware, postController.likePost);
router.get("/:id/dislike", authMiddleware, postController.dislikePost);
router.post("/:id/comment", authMiddleware, postController.addComment);
router.get(
  "/:id/comment/all",
  authMiddleware,
  postController.getCommentsByPosts
);
router.delete("/delete/:id", authMiddleware, postController.deletePostById);
router.post("/:id/bookmark", authMiddleware, postController.bookmarkPost);

module.exports = router;
