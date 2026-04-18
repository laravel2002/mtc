import { apiClient } from '@/lib/api-client';
import { storage, STORAGE_KEYS } from '@/lib/storage';

export interface ReadingHistoryItem {
  storyId: string;
  chapterId: string;
  readAt: number;
}

export const HistoryAPI = {
  saveLocalHistory: (item: ReadingHistoryItem) => {
    const existingStr = storage.getString(STORAGE_KEYS.HISTORY);
    let history: ReadingHistoryItem[] = existingStr ? JSON.parse(existingStr) : [];

    const filtered = history.filter(h => h.storyId !== item.storyId);
    filtered.unshift(item);

    storage.set(STORAGE_KEYS.HISTORY, JSON.stringify(filtered));
  },

  getLocalHistory: (): ReadingHistoryItem[] => {
    const existingStr = storage.getString(STORAGE_KEYS.HISTORY);
    return existingStr ? JSON.parse(existingStr) : [];
  },

  syncToServer: async () => {
    const localData = HistoryAPI.getLocalHistory();
    if (localData.length === 0) return;
    try {
      await apiClient.post('/history/sync', { data: localData });
    } catch (error) {
      console.error('Lỗi đồng bộ:', error);
    }
  }
};
