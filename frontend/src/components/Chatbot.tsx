// frontend/src/components/Chatbot.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { chatbotApi, ChatMessage } from "../services/chatbot_api";
import { getAuthToken } from "../lib/auth-client";

interface ChatbotProps {
  userId: string;
  onTaskUpdate?: () => void; // Callback to refresh tasks after chatbot performs actions
}

export default function Chatbot({ userId, onTaskUpdate }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string>();
  const [isAgentHealthy, setIsAgentHealthy] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Check AI agent health on mount
  useEffect(() => {
    const checkHealth = async () => {
      const healthy = await chatbotApi.checkHealth();
      setIsAgentHealthy(healthy);
    };
    checkHealth();
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Add welcome message when chatbot opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          role: "assistant",
          content: "Hello! I'm your AI task assistant. You can ask me to:\n• Add new tasks\n• Show your tasks\n• Update tasks\n• Delete tasks\n\nHow can I help you today?",
          timestamp: new Date(),
        },
      ]);
    }
  }, [isOpen, messages.length]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      role: "user",
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const authToken = getAuthToken();
      const response = await chatbotApi.sendMessage(
        inputMessage,
        userId,
        conversationId,
        authToken || undefined
      );

      setConversationId(response.conversation_id);

      const assistantMessage: ChatMessage = {
        role: "assistant",
        content: response.response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // If the chatbot performed any task operations, trigger a refresh
      if (response.tool_calls && response.tool_calls.length > 0) {
        onTaskUpdate?.();
      }
    } catch (error: any) {
      const errorMessage: ChatMessage = {
        role: "assistant",
        content: `Sorry, I encountered an error: ${error.message}`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Chatbot Toggle Button - Fixed position on right side */}
      <button
        onClick={toggleChatbot}
        className={`fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center ${
          isOpen
            ? "bg-gradient-to-br from-[#8d6e63] to-[#5d4037] scale-95"
            : "bg-gradient-to-br from-[#d9a441] to-[#8d6e63] hover:scale-110"
        }`}
        style={{
          boxShadow: isOpen
            ? "0 0 20px rgba(141, 110, 99, 0.6)"
            : "0 0 25px rgba(217, 164, 65, 0.8)",
        }}
        title="AI Task Assistant"
      >
        {isOpen ? (
          <svg
            className="w-8 h-8 text-[#f5f1ee]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="w-8 h-8 text-[#3c2f2f]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        )}
      </button>

      {/* Chatbot Window */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-6 z-50 w-96 h-[32rem] rounded-xl shadow-2xl flex flex-col overflow-hidden"
          style={{
            backgroundColor: "var(--bg-card)",
            border: "2px solid var(--border-coffee)",
            boxShadow: "0 0 30px rgba(141, 110, 99, 0.5)",
          }}
        >
          {/* Header */}
          <div
            className="p-4 flex items-center justify-between"
            style={{
              background: "linear-gradient(135deg, #5d4037 0%, #8d6e63 100%)",
            }}
          >
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-[#d9a441] animate-pulse"></div>
              <h3 className="text-lg font-bold text-[#f5f1ee]">AI Task Assistant</h3>
            </div>
            <button
              onClick={toggleChatbot}
              className="text-[#f5f1ee] hover:text-[#d9a441] transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Messages Container */}
          <div
            className="flex-1 overflow-y-auto p-4 space-y-4"
            style={{ backgroundColor: "var(--bg-primary)" }}
          >
            {!isAgentHealthy && (
              <div className="p-3 rounded-lg bg-red-900/20 border border-red-500/50 text-red-300 text-sm">
                ⚠️ AI Assistant is currently offline. Please check if the AI agent server is running.
              </div>
            )}

            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-xl p-3 ${
                    message.role === "user"
                      ? "bg-gradient-to-br from-[#d9a441] to-[#8d6e63] text-[#3c2f2f]"
                      : "bg-[var(--bg-card)] text-[var(--text-primary)] border border-[var(--border-coffee)]"
                  }`}
                  style={{
                    boxShadow:
                      message.role === "user"
                        ? "0 2px 10px rgba(217, 164, 65, 0.3)"
                        : "0 2px 10px rgba(141, 110, 99, 0.2)",
                  }}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.role === "user"
                        ? "text-[#3c2f2f]/70"
                        : "text-[var(--text-secondary)]"
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div
                  className="rounded-xl p-3 bg-[var(--bg-card)] border border-[var(--border-coffee)]"
                  style={{ boxShadow: "0 2px 10px rgba(141, 110, 99, 0.2)" }}
                >
                  <div className="flex space-x-2">
                    <div
                      className="w-2 h-2 rounded-full bg-[#8d6e63] animate-bounce"
                      style={{ animationDelay: "0s" }}
                    ></div>
                    <div
                      className="w-2 h-2 rounded-full bg-[#8d6e63] animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="w-2 h-2 rounded-full bg-[#8d6e63] animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form
            onSubmit={handleSendMessage}
            className="p-4 border-t"
            style={{ borderColor: "var(--border-coffee)" }}
          >
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask me to add, list, update, or delete tasks..."
                className="flex-1 p-3 rounded-lg text-sm focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: "var(--bg-primary)",
                  border: "1px solid var(--border-coffee)",
                  color: "var(--text-primary)",
                  boxShadow: "0 2px 8px rgba(141, 110, 99, 0.1)",
                }}
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !inputMessage.trim()}
                className="px-4 py-3 rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: "linear-gradient(135deg, #5d4037 0%, #8d6e63 100%)",
                  color: "#f5f1ee",
                  boxShadow: "0 0 15px rgba(93, 64, 55, 0.4)",
                }}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
