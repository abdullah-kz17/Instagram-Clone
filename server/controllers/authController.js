const { default: cloudinary } = require("../config/cloudinary");
const getDataUri = require("../config/datauri");
const User = require("../models/userModel");

// Register a new user
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ message: "Email already exists", success: false });
    }

    // Create a new user (the password will be hashed automatically)
    const user = await User.create({
      username,
      email,
      password, // Pass plain password; it will be hashed by the pre-save hook
    });

    // Generate JWT token
    const token = user.generateJWT();

    res.status(201).json({
      message: "User registered successfully",
      success: true,
      id: user._id,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

// Login a user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid credentials", success: false });
    }

    // Compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Invalid credentials", success: false });
    }

    // Generate JWT token
    const token = user.generateJWT();

    res.json({
      message: "Login successful",
      success: true,
      id: user._id,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

// Logout User
const logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    await req.user.save();
    res.json({ message: "Logged out successfully", success: true });
    // Clear cookies
    res.clearCookie("jwt");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

// Get Profile
const getProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    res.json({ message: "Profile fetched successfully", success: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

// Update Profile
const editProfile = async () => {
  try {
    const userId = req.id;
    const { bio, gender } = req.body;
    const profilePicture = req.file;
    if (!bio || !gender) {
      return res
        .status(400)
        .json({ message: "Bio and gender are required", success: false });
    }
    let cloudResponse;
    if (profilePicture) {
      const fileUri = getDataUri(profilePicture);
      await cloudinary.uploader.upload(fileUri);
    }
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }
    if (bio) {
      user.bio = bio;
    }
    if (gender) {
      user.gender = gender;
    }
    if (profilePicture) {
      user.profilePicture = cloudResponse.secure_url;
    }

    await user.save();
    res.json({ message: "Profile updated successfully", success: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error Updating profile", success: false });
  }
};

const getSuggestedUsers = async () => {
  try {
    const suggestedUsers = await User.find({ _id: { $ne: req.id } }).select(
      "-password"
    );
    if (!suggestedUsers) {
      return res
        .status(404)
        .json({ message: "No suggested users found", success: false });
    }
  } catch (error) {}
};

// Export the controller functions
module.exports = {
  register,
  login,
  logout,
};
