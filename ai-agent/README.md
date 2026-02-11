---
title: Todo AI Agent
emoji: 🤖
colorFrom: yellow
colorTo: red
sdk: docker
pinned: false
app_port: 7860
---

# Todo AI Agent

AI Task Management Agent built with FastAPI + OpenAI GPT-4o-mini.

## API Endpoints

- `POST /chat` — Send a message to the AI agent
- `GET /` — Health check

## Environment Variables (Secrets)

Set these in your HuggingFace Space settings → **Secrets**:

| Variable | Description |
|---|---|
| `OPENAI_API_KEY` | Your OpenAI API key |
| `MCP_SERVER_URL` | URL of your MCP server (e.g. `https://your-space.hf.space`) |
| `BACKEND_URL` | URL of your deployed backend (e.g. `https://rameesha12123214-todophase02-backend.hf.space`) |
