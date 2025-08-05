import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";


const moods = [
  { emoji: "😊", label: "Happy", color: "bg-yellow-200" },
  { emoji: "😐", label: "Neutral", color: "bg-gray-200" },
  { emoji: "😢", label: "Sad", color: "bg-blue-200" },
  { emoji: "😠", label: "Angry", color: "bg-red-200" },
  { emoji: "😴", label: "Tired", color: "bg-purple-200" },
];

function MoodPicker() {
  const [selectedMood, setSelectedMood] = useState(null);

  const handleClick = (label) => {
    setSelectedMood(label);
    console.log(`Mood selected: ${label}`);

    // Optional: Simulate saving to mock API
    fetch("http://localhost:5000/api/moods", {
  method: "POST",
  body: JSON.stringify({ mood: label }),
  headers: { "Content-type": "application/json" },
});


      confetti({
  particleCount: 100,
  spread: 60,
  origin: { y: 0.6 },
});

  };

  useEffect(() => {
  if (selectedMood) {
    const history = JSON.parse(localStorage.getItem("moodHistory")) || [];
    history.push({ mood: selectedMood, date: new Date().toISOString() });
    localStorage.setItem("moodHistory", JSON.stringify(history));
  }
}, [selectedMood]);

  return (
    <div className="p-6 text-center">
      <h2 className="text-2xl font-semibold mb-4 text-indigo-600">
        Pick Your Mood 🎭
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {moods.map((mood) => (
          <button
            key={mood.label}
            onClick={() => handleClick(mood.label)}
            className={`text-4xl p-4 rounded-lg shadow hover:scale-110 transition duration-200 cursor-pointer ${mood.color}${selectedMood === mood.label ? "border-4 border-indigo-500 ring-2 ring-indigo-300" : ""}`}
            title={mood.label}
            
          >
            {mood.emoji}
          </button>
        ))}
      </div>

      {selectedMood && (
        <p className="mt-6 text-lg text-green-700 font-medium">
          You feel <span className="underline">{selectedMood}</span> today 🌟
        </p>
      )}
    </div>
  );
}

export default MoodPicker;