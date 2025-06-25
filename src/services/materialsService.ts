import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

const axiosConfig = {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json; charset=utf-8'
  }
};

export interface Article {
  id: string;
  title: string;
  content: string;
  author?: string;
  created_at?: string;
  image_url?: string;
  tags?: string[];
  type?: 'article';
}

export interface Document {
  id: string;
  title: string;
  description: string;
  file_url: string;
  created_at?: string;
  category?: string;
  tags?: string[];
  type?: 'document';
}

export interface Media {
  id: string;
  title: string;
  description: string;
  media_url: string;
  type: 'video' | 'audio';
  created_at?: string;
  duration?: number;
  tags?: string[];
}

// Функция для получения одной статьи по ID
export const fetchArticleById = async (id: string): Promise<Article> => {
  const response = await axios.get(`${API_URL}/articles/${id}`, axiosConfig);
  return response.data;
};

export const materialsService = {
  // Статьи
  getAllArticles: async (): Promise<Article[]> => {
    console.log('Fetching articles from API...');
    const response = await axios.get(`${API_URL}/articles`, axiosConfig);
    console.log('Got response:', response.data);
    return response.data;
  },

  getArticleById: async (id: string): Promise<Article> => {
    console.log(`Fetching article ${id}...`);
    const response = await axios.get(`${API_URL}/articles/${id}`, axiosConfig);
    console.log('Got article:', response.data);
    return response.data;
  },

  // Документы
  getAllDocuments: async (): Promise<Document[]> => {
    console.log('Fetching documents from API...');
    const response = await axios.get(`${API_URL}/documents`, axiosConfig);
    console.log('Got documents:', response.data);
    return response.data;
  },

  getDocumentsByCategory: async (category: string): Promise<Document[]> => {
    const response = await axios.get(`${API_URL}/documents/category/${category}`);
    return response.data;
  },

  // Медиа
  getAllMedia: async (): Promise<Media[]> => {
    console.log('Fetching media from API...');
    const response = await axios.get(`${API_URL}/media`, axiosConfig);
    console.log('Got media:', response.data);
    return response.data;
  },

  getMediaByType: async (type: 'video' | 'audio'): Promise<Media[]> => {
    const response = await axios.get(`${API_URL}/media/type/${type}`);
    return response.data;
  },

  fetchArticleById, // <-- Добавляем новую функцию сюда
};
