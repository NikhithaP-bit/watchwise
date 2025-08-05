import React, { useEffect, useState } from "react";

function MoodTimeline() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("moodHistory")) || [];
    setHistory(stored.reverse()); // latest first
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-indigo-400 text-center">Mood Timeline 📅</h2>
      <ul className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {history.map((entry, idx) => (
          <li
            key={idx}
            className="bg-white text-gray-800 border-l-4 border-yellow-400 rounded-lg px-4 py-3 shadow transition duration-300 hover:shadow-lg"
          >
            <div className="font-semibold text-lg">{entry.mood}</div>
            <div className="text-sm mt-1">
              {new Date(entry.date).toLocaleDateString()} at{" "}
              {new Date(entry.date).toLocaleTimeString()}
            </div>
            {entry.note && (
              <p className="mt-2 italic text-gray-600">{entry.note}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MoodTimeline;