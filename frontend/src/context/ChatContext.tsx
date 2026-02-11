// frontend/src/context/ChatContext.tsx
"use client";

import { createContext, useState, useContext, ReactNode } from "react";
import { useAuth } from "./AuthContext";
import { chatbotApi } from "../services/chatbot_api";

interface Message {
  id: number;
  role: string;
  content: string;
  created_at: string;
}

interface Conversation {
  id: number;
}

interface ChatContextType {
  messages: Message[];
  sendMessage: (content: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  activeConversationId: number | null;
  setActiveConversationId: (id: number | null) => void;
  conversations: Conversation[];
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

let messageIdCounter = 1;

export function ChatProvider({ children }: { children: ReactNode }) {
  const { user, token } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeConversationId, setActiveConversationId] = useState<number | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: messageIdCounter++,
      role: "user",
      content,
      created_at: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const userId = user?.id || "guest";
      const conversationId = activeConversationId ? String(activeConversationId) : undefined;

      const response = await chatbotApi.sendMessage(content, userId, conversationId, token || undefined);

      const assistantMessage: Message = {
        id: messageIdCounter++,
        role: "assistant",
        content: response.response,
        created_at: new Date().toISOString(),
      };

      setMessages(prev => [...prev, assistantMessage]);

      if (response.conversation_id) {
        const newConvoId = Number(response.conversation_id);
        if (!isNaN(newConvoId) && newConvoId !== activeConversationId) {
          setActiveConversationId(newConvoId);
          setConversations(prev => {
            const exists = prev.find(c => c.id === newConvoId);
            return exists ? prev : [...prev, { id: newConvoId }];
          });
        }
      }
    } catch (err: any) {
      setError(err.message || "Failed to send message");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetActiveConversationId = (id: number | null) => {
    setActiveConversationId(id);
    setMessages([]);
  };

  return (
    <ChatContext.Provider value={{
      messages,
      sendMessage,
      isLoading,
      error,
      activeConversationId,
      setActiveConversationId: handleSetActiveConversationId,
      conversations,
    }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
}
