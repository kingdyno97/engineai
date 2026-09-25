const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const OLLAMA = process.env.OLLAMA_URL || "http://localhost:11434";

app.use(cors());
app.use(express.json({ limit: "2mb" }));
app.use(express.static(path.join(__dirname, "public")));

// Proxy chat requests to local Ollama (avoids CORS when opened from file://)
app.post("/api/chat", async (req, res) => {
  try {
    const response = await fetch(`${OLLAMA}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    if (!response.ok) {
      const text = await response.text();
      return res.status(response.status).send(text);
    }

    // Stream the response through
    res.setHeader("Content-Type", "application/x-ndjson");
    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      res.write(decoder.decode(value));
    }
    res.end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// List available models
app.get("/api/tags", async (req, res) => {
  try {
    const response = await fetch(`${OLLAMA}/api/tags`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Ollama not reachable. Is it running?" });
  }
});

app.listen(PORT, () => {
  console.log(`\n  Veritas running at http://localhost:${PORT}`);
  console.log(`  Make sure Ollama is running with an uncensored model.\n`);
});
