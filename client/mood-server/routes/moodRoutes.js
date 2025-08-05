const express = require("express");
const router = express.Router();
const Mood = require("../models/Mood");

router.post("/", async (req, res) => {
  try {
    const { mood, note } = req.body;
    if (!mood) {
      return res.status(400).json({ error: "Mood is required." });
    }

    const newMood = new Mood({ mood, note });
    await newMood.save();
    res.status(201).json(newMood);
  } catch (error) {
    console.error("Save error:", error.message);
    res.status(500).json({ error: "Server error. Could not save mood." });
  }
});

router.get("/", async (req, res) => {
  try {
    const moods = await Mood.find().sort({ date: -1 });
    res.json(moods);
  } catch (error) {
    console.error("Fetch error:", error.message);
    res.status(500).json({ error: "Server error. Could not retrieve moods." });
  }
});
module.exports = router;

