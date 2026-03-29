"use client";

import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!text.trim()) return;

    setLoading(true);
    setSummary("");

    try {
      const res = await fetch("/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();
      setSummary(data.summary);

      await fetch("/api/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: text,
          summary: data.summary,
        }),
      });
    } catch (error) {
      console.error("Error:", error);
      setSummary("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container">
      <h1 className="title">AI Notes App</h1>

      <textarea
        className="textarea"
        placeholder="Enter your text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        className="button"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Summarizing..." : "Summarize"}
      </button>

      {summary && (
        <div className="summaryBox">
          <h3 className="summaryTitle">Summary</h3>
          <p className="summaryText">{summary}</p>
        </div>
      )}
    </main>
  );
}