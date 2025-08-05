const mongoose = require("mongoose");

const MoodSchema = new mongoose.Schema({
  mood: {
    type: String,
    required: true,
    enum: ["Happy", "Neutral", "Sad", "Angry", "Tired"], // only these moods allowed
  },
  note: {
    type: String,
    trim: true,
    maxlength: 200,
    default: "",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Mood", MoodSchema);