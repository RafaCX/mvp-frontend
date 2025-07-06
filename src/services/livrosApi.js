// src/services/livrosApi.js
import axios from 'axios';

const livrosApi = axios.create({
  baseURL: 'http://localhost:3001', // ou porta do seu json-server
  headers: {
    'Content-Type': 'application/json',
  },
});

export default livrosApi;
