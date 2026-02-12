"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { taskApi } from "../../lib/api-client";
import { CheckCircle2, Circle, Pencil, Trash2, Plus, X, BarChart3, ListTodo, CheckCheck, Clock, Sparkles, Bot, Zap } from "lucide-react";

interface Todo {
  id: string;
  title: string;
  description: string | null;
  completed: boolean;
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [newTodoDescription, setNewTodoDescription] = useState("");
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"todos" | "analytics">("todos");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => { fetchTodos(); }, []);

  const fetchTodos = async () => {
    setIsLoading(true);
    try {
      const data = await taskApi.getTasks();
      setTodos(data.map((t: any) => ({ ...t, completed: t.completed ?? (t.status === "completed") })));
    } catch (err: any) { setError(err.message); }
    finally { setIsLoading(false); }
  };

  const totalTodos = todos.length;
  const completedTodos = todos.filter(t => t.completed).length;
  const pendingTodos = totalTodos - completedTodos;
  const completionRate = totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoTitle.trim()) return;
    try {
      await taskApi.createTask({ title: newTodoTitle, description: newTodoDescription });
      setNewTodoTitle(""); setNewTodoDescription(""); setShowAddForm(false);
      fetchTodos();
    } catch (err: any) { setError(err.message); }
  };

  const handleUpdateTodo = async (todo: Todo) => {
    try {
      await taskApi.updateTask(Number(todo.id), { title: todo.title, description: todo.description, completed: todo.completed });
      setEditingTodo(null); fetchTodos();
    } catch (err: any) { setError(err.message); }
  };

  const toggleComplete = async (id: string) => {
    const todo = todos.find(t => t.id === id);
    if (todo) {
      try { await taskApi.toggleTaskComplete(Number(id), !todo.completed); fetchTodos(); }
      catch (err: any) { setError(err.message); }
    }
  };

  const handleDelete = async (id: string) => {
    try { await taskApi.deleteTask(Number(id)); fetchTodos(); }
    catch (err: any) { setError(err.message); }
  };

  return (
    <div className="w-full space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs font-medium uppercase tracking-widest" style={{ color: "rgba(217,164,65,0.6)" }}>
              AI Powered Dashboard
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold" style={{ color: "#f0e6d2", letterSpacing: "-0.5px" }}>
            Welcome back,{" "}
            <span style={{ background: "linear-gradient(90deg, #d9a441, #f0c060)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              {user?.name || user?.email?.split("@")[0] || "User"}
            </span> 👋
          </h1>
          <p className="text-sm mt-1" style={{ color: "rgba(217,164,65,0.5)" }}>
            {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>
        <button onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-105 whitespace-nowrap"
          style={showAddForm ? {
            background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#f0e6d2",
          } : {
            background: "linear-gradient(135deg, #d9a441, #c49235)", color: "#1a1208", boxShadow: "0 4px 20px rgba(217,164,65,0.35)",
          }}>
          {showAddForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showAddForm ? "Cancel" : "Add Task"}
        </button>
      </div>

      {/* AI Banner */}
      <div className="rounded-2xl p-4 flex items-center gap-4" style={{
        background: "linear-gradient(135deg, rgba(217,164,65,0.08), rgba(93,64,55,0.12))",
        border: "1px solid rgba(217,164,65,0.18)",
      }}>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{
          background: "linear-gradient(135deg, rgba(217,164,65,0.2), rgba(93,64,55,0.2))",
          border: "1px solid rgba(217,164,65,0.3)",
        }}>
          <Bot className="w-5 h-5" style={{ color: "#d9a441" }} />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold" style={{ color: "#f0c060" }}>AI Task Assistant Active</p>
          <p className="text-xs" style={{ color: "rgba(217,164,65,0.55)" }}>
            Click the chat button (bottom-right) to manage tasks with natural language
          </p>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg" style={{ background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.2)" }}>
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs font-medium text-green-400">Online</span>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="p-4 rounded-xl text-sm" style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", color: "#fca5a5" }}>
          {error}
        </div>
      )}

      {/* Add Task Form */}
      {showAddForm && (
        <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(217,164,65,0.2)", boxShadow: "0 8px 32px rgba(0,0,0,0.3)" }}>
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-4 h-4" style={{ color: "#d9a441" }} />
            <h2 className="text-base font-semibold" style={{ color: "#f0e6d2" }}>New Task</h2>
          </div>
          <form onSubmit={handleAddTodo} className="space-y-3">
            <input type="text" placeholder="Task title *" value={newTodoTitle}
              onChange={e => setNewTodoTitle(e.target.value)}
              className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-all"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(217,164,65,0.2)", color: "#f0e6d2" }}
              required autoFocus />
            <textarea placeholder="Description (optional)" value={newTodoDescription}
              onChange={e => setNewTodoDescription(e.target.value)}
              className="w-full px-4 py-3 rounded-xl text-sm resize-none focus:outline-none"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(217,164,65,0.2)", color: "#f0e6d2" }}
              rows={2} />
            <div className="flex gap-3">
              <button type="submit" className="px-6 py-2.5 rounded-xl font-semibold text-sm transition-all hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #d9a441, #c49235)", color: "#1a1208" }}>Add Task</button>
              <button type="button" onClick={() => setShowAddForm(false)}
                className="px-6 py-2.5 rounded-xl font-semibold text-sm"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(240,230,210,0.6)" }}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Total", value: totalTodos, icon: ListTodo, color: "#d9a441", glow: "rgba(217,164,65,0.15)" },
          { label: "Completed", value: completedTodos, icon: CheckCheck, color: "#4ade80", glow: "rgba(74,222,128,0.12)" },
          { label: "Pending", value: pendingTodos, icon: Clock, color: "#fb923c", glow: "rgba(251,146,60,0.12)" },
          { label: "Done Rate", value: `${completionRate}%`, icon: BarChart3, color: "#60a5fa", glow: "rgba(96,165,250,0.12)" },
        ].map(stat => (
          <div key={stat.label} className="rounded-2xl p-4 transition-all duration-200 hover:scale-[1.02]" style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
            border: "1px solid rgba(255,255,255,0.08)", boxShadow: `0 4px 20px ${stat.glow}`,
          }}>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-medium uppercase tracking-wider" style={{ color: "rgba(240,214,178,0.45)" }}>{stat.label}</p>
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${stat.color}18` }}>
                <stat.icon className="w-3.5 h-3.5" style={{ color: stat.color }} />
              </div>
            </div>
            <p className="text-2xl font-bold" style={{ color: stat.color }}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Progress */}
      {totalTodos > 0 && (
        <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" style={{ color: "#d9a441" }} />
              <span className="text-sm font-medium" style={{ color: "rgba(240,214,178,0.6)" }}>Overall Progress</span>
            </div>
            <span className="text-sm font-bold" style={{ color: "#d9a441" }}>{completionRate}%</span>
          </div>
          <div className="w-full rounded-full h-2" style={{ background: "rgba(255,255,255,0.08)" }}>
            <div className="h-2 rounded-full transition-all duration-700"
              style={{ width: `${completionRate}%`, background: "linear-gradient(90deg, #8d6e63, #d9a441, #f0c060)" }} />
          </div>
          <p className="text-xs mt-2" style={{ color: "rgba(240,214,178,0.3)" }}>{completedTodos} of {totalTodos} tasks completed</p>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl w-fit" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
        {(["todos", "analytics"] as const).map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className="px-5 py-2 rounded-lg text-sm font-medium capitalize transition-all duration-200"
            style={activeTab === tab ? {
              background: "linear-gradient(135deg, #d9a441, #c49235)", color: "#1a1208", boxShadow: "0 2px 12px rgba(217,164,65,0.3)",
            } : { color: "rgba(240,214,178,0.5)" }}>
            {tab}
          </button>
        ))}
      </div>

      {/* Todos */}
      {activeTab === "todos" && (
        <div className="space-y-2">
          {isLoading ? (
            <div className="text-center py-16">
              <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin mx-auto mb-3"
                style={{ borderColor: "#d9a441", borderTopColor: "transparent" }} />
              <p className="text-sm" style={{ color: "rgba(240,214,178,0.4)" }}>Loading tasks...</p>
            </div>
          ) : todos.length === 0 ? (
            <div className="text-center py-16 rounded-2xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="text-5xl mb-4">☕</div>
              <p className="font-semibold mb-1" style={{ color: "#f0e6d2" }}>No tasks yet</p>
              <p className="text-sm" style={{ color: "rgba(240,214,178,0.4)" }}>Add a task or ask AI assistant to create one</p>
            </div>
          ) : todos.map(todo => (
            <div key={todo.id} className="rounded-2xl transition-all duration-200 hover:scale-[1.005]"
              style={todo.completed ? {
                background: "rgba(255,255,255,0.02)", border: "1px solid rgba(74,222,128,0.1)", opacity: 0.6,
              } : {
                background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
              }}>
              {editingTodo?.id === todo.id ? (
                <div className="p-5 space-y-3">
                  <input type="text" value={editingTodo.title}
                    onChange={e => setEditingTodo({ ...editingTodo, title: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl text-sm focus:outline-none"
                    style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(217,164,65,0.25)", color: "#f0e6d2" }} />
                  <textarea value={editingTodo.description || ""}
                    onChange={e => setEditingTodo({ ...editingTodo, description: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl text-sm resize-none focus:outline-none"
                    style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(217,164,65,0.25)", color: "#f0e6d2" }} rows={2} />
                  <div className="flex gap-2">
                    <button onClick={() => handleUpdateTodo(editingTodo)} className="px-4 py-2 rounded-xl text-sm font-medium hover:opacity-90"
                      style={{ background: "linear-gradient(135deg, #d9a441, #c49235)", color: "#1a1208" }}>Save</button>
                    <button onClick={() => setEditingTodo(null)} className="px-4 py-2 rounded-xl text-sm font-medium"
                      style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(240,230,210,0.6)" }}>Cancel</button>
                  </div>
                </div>
              ) : (
                <div className="p-4 flex items-center gap-4">
                  <button onClick={() => toggleComplete(todo.id)} className="shrink-0 transition-transform hover:scale-110">
                    {todo.completed
                      ? <CheckCircle2 className="w-5 h-5 text-green-500" />
                      : <Circle className="w-5 h-5" style={{ color: "rgba(217,164,65,0.35)" }} />}
                  </button>
                  <div className="flex-1 min-w-0">
                    <p className={`font-medium text-sm truncate ${todo.completed ? "line-through" : ""}`}
                      style={{ color: todo.completed ? "rgba(240,214,178,0.3)" : "#f0e6d2" }}>{todo.title}</p>
                    {todo.description && (
                      <p className="text-xs mt-0.5 truncate" style={{ color: "rgba(240,214,178,0.35)" }}>{todo.description}</p>
                    )}
                  </div>
                  {todo.completed && (
                    <span className="shrink-0 px-2 py-0.5 rounded-full text-xs font-medium"
                      style={{ background: "rgba(74,222,128,0.1)", color: "#4ade80", border: "1px solid rgba(74,222,128,0.2)" }}>Done</span>
                  )}
                  <div className="flex items-center gap-1 shrink-0">
                    <button onClick={() => setEditingTodo(todo)} className="p-2 rounded-lg hover:bg-white/5" style={{ color: "rgba(217,164,65,0.4)" }}>
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => handleDelete(todo.id)} className="p-2 rounded-lg hover:bg-red-500/10" style={{ color: "rgba(217,164,65,0.4)" }}>
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Analytics */}
      {activeTab === "analytics" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: "Total Tasks", value: totalTodos, color: "#d9a441", bg: "rgba(217,164,65,0.08)", border: "rgba(217,164,65,0.2)" },
              { label: "Completed", value: completedTodos, color: "#4ade80", bg: "rgba(74,222,128,0.08)", border: "rgba(74,222,128,0.2)" },
              { label: "Pending", value: pendingTodos, color: "#fb923c", bg: "rgba(251,146,60,0.08)", border: "rgba(251,146,60,0.2)" },
            ].map(card => (
              <div key={card.label} className="rounded-2xl p-6" style={{ background: card.bg, border: `1px solid ${card.border}` }}>
                <p className="text-sm mb-2" style={{ color: "rgba(240,214,178,0.5)" }}>{card.label}</p>
                <p className="text-4xl font-bold" style={{ color: card.color }}>{card.value}</p>
              </div>
            ))}
          </div>
          <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-4 h-4" style={{ color: "#d9a441" }} />
              <h3 className="font-semibold" style={{ color: "#f0e6d2" }}>Completion Rate</h3>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="w-full rounded-full h-3" style={{ background: "rgba(255,255,255,0.08)" }}>
                  <div className="h-3 rounded-full transition-all duration-700"
                    style={{ width: `${completionRate}%`, background: "linear-gradient(90deg, #5d4037, #d9a441, #f0c060)" }} />
                </div>
              </div>
              <span className="text-2xl font-bold min-w-[4rem] text-right" style={{ color: "#d9a441" }}>{completionRate}%</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
