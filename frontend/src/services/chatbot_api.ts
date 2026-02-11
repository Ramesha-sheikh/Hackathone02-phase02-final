// frontend/src/services/chatbot_api.ts

const AI_AGENT_URL = process.env.NEXT_PUBLIC_AI_AGENT_URL || 'http://localhost:8002';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatRequest {
  message: string;
  user_id: string;
  conversation_id?: string;
  auth_token?: string;
}

interface ChatResponse {
  conversation_id: string;
  response: string;
  tool_calls: Array<{
    name: string;
    arguments: any;
  }>;
}

export const chatbotApi = {
  sendMessage: async (message: string, userId: string, conversationId?: string, authToken?: string): Promise<ChatResponse> => {
    try {
      const response = await fetch(`${AI_AGENT_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          user_id: userId,
          conversation_id: conversationId,
          auth_token: authToken
        } as ChatRequest),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `Failed to send message: ${response.status}`);
      }

      return await response.json();
    } catch (error: any) {
      console.error('Chatbot API Error:', error);
      throw new Error(error.message || 'Failed to communicate with AI assistant');
    }
  },

  checkHealth: async (): Promise<boolean> => {
    try {
      const response = await fetch(`${AI_AGENT_URL}/`, {
        method: 'GET',
      });
      return response.ok;
    } catch {
      return false;
    }
  }
};

export type { ChatMessage, ChatRequest, ChatResponse };
