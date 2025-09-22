// src/components/AISuggestions.jsx
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ReactMarkdown from "react-markdown";

const AISuggestions = ({ context }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!context) return;

    const fetchSuggestions = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:5000/tasks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ context }),
        });

        if (!res.ok) throw new Error("Failed to fetch AI suggestions");

        const data = await res.json();
        setSuggestions(data.tasks || []);
      } catch (err) {
        console.error("AI suggestions fetch error:", err);
        toast.error("Could not fetch AI suggestions");
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, [context]);

  if (loading) return <p className="text-white">Loading suggestions...</p>;
  if (!suggestions.length) return <p className="text-white">No suggestions available.</p>;

  return (
    <div className="mb-6 p-6 bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl shadow text-white">
      <h2 className="font-semibold mb-3 text-lg">AI Mentor Suggestions 💡</h2>
      <ul className="list-disc list-inside space-y-2">
  {suggestions.map((s, i) => {
    // Split by "* " and remove empty strings
    const parts = s.split("*").map(p => p.trim()).filter(p => p);
    return (
      <li key={i} className="ml-2">
        {parts.map((p, idx) => (
          <p key={idx}>{p}</p>
        ))}
      </li>
    );
  })}
</ul>

    </div>
  );
};

export default AISuggestions;
