import { useState } from "react";
import axios from "axios";

const MoodForm = ({ onMoodSubmit }) => {
  const [mood, setMood] = useState("");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/moods", { mood, note });
      localStorage.setItem(
        "moodHistory",
        JSON.stringify([
          { mood, note, date: new Date().toISOString() },
          ...(JSON.parse(localStorage.getItem("moodHistory")) || []),
        ])
      );
      setStatus("Mood saved 🎉");
      if (onMoodSubmit) onMoodSubmit(mood); // trigger banner update
      setMood("");
      setNote("");
    } catch (error) {
      setStatus("Error saving mood 😢");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-6 bg-white text-gray-800 rounded shadow-md max-w-md mx-auto"
    >
      <select
        value={mood}
        onChange={(e) => setMood(e.target.value)}
        required
        className="p-3 bg-white text-gray-800 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select mood</option>
        <option value="Happy">😊 Happy</option>
        <option value="Neutral">😐 Neutral</option>
        <option value="Sad">😢 Sad</option>
        <option value="Angry">😠 Angry</option>
        <option value="Tired">😴 Tired</option>
      </select>

      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Add a note..."
        className="p-3 bg-white text-gray-800 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={4}
        maxLength={200}
      />

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
      >
        Save Mood
      </button>

      {status && <p className="text-sm text-center text-green-600 font-medium">{status}</p>}
    </form>
  );
};

export default MoodForm;

