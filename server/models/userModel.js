const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default: "default_profile_picture.jpg",
    },
    bio: {
      type: String,
      default: "",
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    bookmarks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
  },

  {
    timestamps: true,
  }
);

// Hashing passwords before saving them to the database
userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    const Salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, Salt);
    user.password = hashedPassword;
  }

  next();
});

// Comparing Password before saving
userSchema.methods.comparePassword = async function (password) {
  const user = this;
  const isMatch = await bcrypt.compare(password, user.password);

  return isMatch;
};

// Generating JWT token
userSchema.methods.generateJWT = function () {
  const user = this;
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "7d",
  });
  return token;
};
const User = mongoose.model("User", userSchema);

module.exports = User;
