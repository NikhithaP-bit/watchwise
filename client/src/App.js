import React, { useState } from "react";
import MoodPicker from "./components/MoodPicker";
import MoodTimeline from "./components/MoodTimeline";
import MoodForm from "./components/MoodForm";
import MoodBanner from "./components/MoodBanner";

function App() {
  const [latestMood, setLatestMood] = useState("");

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Floating mood mascot */}
      <MoodBanner latestMood={latestMood} />

      <div className="max-w-4xl mx-auto space-y-10">
        <header className="text-center">
          <h1 className="text-4xl font-bold text-indigo-400 mb-2">Watchwise 🎬</h1>
          <p className="text-gray-300 text-sm">Track your moods, reflect your day</p>
        </header>

        {/* Mood Picker Section */}
        <section>
          <MoodPicker />
        </section>

        {/* Mood Timeline Section */}
        <section className="animate-fadeIn">
          <MoodTimeline />
        </section>

        {/* Mood Form Section */}
        <section>
          <MoodForm onMoodSubmit={setLatestMood} />
        </section>
      </div>
    </div>
  );
}

export default App;