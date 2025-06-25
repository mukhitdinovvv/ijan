import axios from 'axios';

// Динамическое определение базового URL для API
const getBaseUrl = () => {
  // Если есть переменная окружения VITE_API_URL, используем её
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }

  // Если мы в продакшене, используем относительный путь 
  // (предполагается, что в продакшене API и фронтенд находятся на одном домене)
  if (import.meta.env.PROD) {
    return '';
  }

  // В локальной разработке используем localhost на порту 8000
  return 'http://localhost:8000';
};

const API_BASE_URL = getBaseUrl();

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export const sendChatMessage = async (messages: ChatMessage[]) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/ai/chat`, { messages });
    return response.data.reply as string;
  } catch (error) {
    console.error('Error sending chat message:', error);
    throw error;
  }
};
