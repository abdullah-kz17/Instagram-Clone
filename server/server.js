const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const { connectDb } = require("./config/db");

const app = express();

app.use(express.json());

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
