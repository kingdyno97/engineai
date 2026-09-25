# Veritas

Local, private chat interface for uncensored models running through Ollama.

## Requirements

- Node.js 18+
- Ollama installed (https://ollama.com)
- An uncensored model pulled into Ollama

## Quick start

```bash
# 1. Pull a model (pick one)
ollama run huihui-ai/qwen3-abliterated:4b

# or the stronger 27B (needs ~24 GB VRAM)
ollama run hf.co/chimingw/Qwen3.8-27B-Uncensored-OrcaRouter-GGUF:Q4_K_M

# 2. Install & run Veritas
cd veritas
npm install
npm start
```

Open http://localhost:3000

## Notes

- Everything stays on your machine.
- The system prompt is minimal and direct.
- Change models anytime from the sidebar dropdown.
