"use client";
import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");

  const handleSubmit = async () => {
    const res = await fetch("/api/summarize", {
      method: "POST",
      body: JSON.stringify({ text }),
    });

    const data = await res.json();
    setSummary(data.summary);

    await fetch("/api/save", {
      method: "POST",
      body: JSON.stringify({
        content: text,
        summary: data.summary,
      }),
    });
  };

  return (
    <div>
      <textarea onChange={(e) => setText(e.target.value)} />
      <button onClick={handleSubmit}>Summarize</button>
      <p>{summary}</p>
    </div>
  );
}