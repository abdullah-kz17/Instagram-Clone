const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/multer");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/logout", authController.logout);
router.get("/:id/profile", authMiddleware, authController.getProfile);
router.get(
  "/profile/edit",
  authMiddleware,
  upload.single("profilePicture"),
  authController.editProfile
);
router.get("/suggested", authMiddleware, authController.getSuggestedUsers);
router.get(
  "/followOrUnfollow/:id",
  authMiddleware,
  authController.followOrUnfollow
);

module.exports = router;
