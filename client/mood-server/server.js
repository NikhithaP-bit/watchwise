const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Mood = require("./models/Mood");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/moods", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// 🔌 Import and use the mood routes
const moodRoutes = require("./routes/moodRoutes");
app.use("/api/moods", moodRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));