'use client';
import { useState } from 'react';

export default function Home() {
  const [city, setCity] = useState('');
  const [interests, setInterests] = useState('');
  const [itinerary, setItinerary] = useState('');
  const [loading, setLoading] = useState(false);

  const generateItinerary = async () => {
    if (!city || !interests) return alert("Please fill in all fields.");
    setLoading(true);
    setItinerary("");

    try {
      const response = await fetch("/api/itinerary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ city, interests })
      });
      const data = await response.json();
      setItinerary(data.itinerary);
    } catch (error) {
      setItinerary("Error generating itinerary. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ padding: 40, fontFamily: 'Arial' }}>
      <h1 style={{ fontSize: 32, fontWeight: 'bold' }}>One-Day AI Travel Planner ✈️</h1>
      <p>Enter your destination and interests to generate a smart, custom travel plan instantly.</p>
      <div style={{ marginTop: 20 }}>
        <input placeholder="City" value={city} onChange={e => setCity(e.target.value)} />
        <br /><br />
        <textarea placeholder="Interests" value={interests} onChange={e => setInterests(e.target.value)} />
        <br /><br />
        <button onClick={generateItinerary} disabled={loading}>
          {loading ? "Generating..." : "Generate Itinerary"}
        </button>
      </div>
      {itinerary && (
        <div style={{ marginTop: 20, whiteSpace: 'pre-wrap' }}>
          <h2>Your AI-Powered Itinerary</h2>
          <pre>{itinerary}</pre>
        </div>
      )}
    </main>
  );
}
