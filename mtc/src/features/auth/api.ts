import { apiClient } from '@/lib/api-client';
import { storage, STORAGE_KEYS } from '@/lib/storage';

export const AuthAPI = {
  login: async (credentials: any) => {
    const response = await apiClient.post('/auth/login', credentials);
    if (response.data?.token) {
      storage.set(STORAGE_KEYS.TOKEN, response.data.token);
    }
    return response.data;
  },
  logout: () => {
    storage.remove(STORAGE_KEYS.TOKEN);
  }
};
