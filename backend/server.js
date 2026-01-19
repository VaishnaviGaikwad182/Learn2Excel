require("dotenv").config();
const progressRoutes = require("./routes/progress");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Import routes
const authRoutes = require("./routes/auth");
const quizRoutes = require("./routes/quiz");

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Serve static files from the frontend directory
app.use(express.static("../frontend"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/progress", progressRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Learn2Excel Backend Running");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Connect MySQL
const db = require("./db");
