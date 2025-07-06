// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 🔍 Função para buscar livros na API externa (Google Books)
export async function searchBooks(term = 'react', maxResults = 6) {
  const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(term)}&maxResults=${maxResults}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar livros da API externa:', error);
    throw error;
  }
}

export default api;
