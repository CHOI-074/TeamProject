// axios 기반 CRUD 함수 모아놓는 곳

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: { 'Content-Type': 'application/json' },
});

export default api;
