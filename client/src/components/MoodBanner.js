import React, { useEffect, useState } from "react";

const MoodBanner = ({ latestMood }) => {
  const [emoji, setEmoji] = useState("");

  useEffect(() => {
    const moodEmoji = {
      Happy: "😊",
      Neutral: "😐",
      Sad: "😢",
      Angry: "😠",
      Tired: "😴",
    };

    if (latestMood) {
      setEmoji(moodEmoji[latestMood] || "");
      return;
    }

    const moods = JSON.parse(localStorage.getItem("moodHistory")) || [];
    if (moods.length && moods[0].mood) {
      setEmoji(moodEmoji[moods[0].mood] || "");
    }
  }, [latestMood]);

  if (!emoji) return null;

  return (
    <div
      role="status"
      aria-label={`Current mood is ${emoji}`}
      className="fixed top-4 right-4 bg-indigo-600 text-white px-4 py-2 rounded-full shadow-lg text-lg z-50"
    >
      Current Mood: {emoji}
    </div>
  );
};

export default MoodBanner;