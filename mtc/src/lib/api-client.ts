import axios from 'axios';
import { storage, STORAGE_KEYS } from './storage';

// Cần thay bằng IP thực tế khi chạy máy ảo Android
const API_URL = 'http://10.0.2.2:3000/api/v1';

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use((config) => {
  const token = storage.getString(STORAGE_KEYS.TOKEN);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    const resData = response.data;
    if (resData.success === false) {
      return Promise.reject(resData.error || 'Lỗi từ Server');
    }
    return { data: resData.data, pagination: resData.pagination } as any;
  },
  (error) => {
    if (error.response?.status === 401) {
      storage.remove(STORAGE_KEYS.TOKEN);
    }
    return Promise.reject(error.response?.data?.error || error.message);
  }
);
