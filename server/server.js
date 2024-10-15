const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const { connectDb } = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const messageRoutes = require("./routes/messageRoutes");
const postRoutes = require("./routes/postRoutes");
const cors = require("cors");

const app = express();

app.use(express.json());

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ["GET", "POST", "PUT", "DELETE"],
};
app.use(cors(corsOptions));

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/post", postRoutes);

const PORT = process.env.PORT || 5000;

connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });
