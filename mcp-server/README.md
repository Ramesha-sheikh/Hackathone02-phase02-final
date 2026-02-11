---
title: Todo MCP Server
emoji: ⚙️
colorFrom: blue
colorTo: green
sdk: docker
pinned: false
app_port: 7860
---

# Todo MCP Server

HTTP-based MCP Server for Task Management. Acts as a bridge between the AI Agent and the Todo Backend.

## API Endpoints

- `POST /call_tool` — Execute a tool (get_tasks, create_task, update_task, delete_task)
- `GET /` — Health check

## Environment Variables (Secrets)

Set in HuggingFace Space → **Settings** → **Variables and Secrets**:

| Variable | Description |
|---|---|
| `BACKEND_BASE_URL` | Deployed backend URL (e.g. `https://rameesha12123214-todophase02-backend.hf.space`) |
