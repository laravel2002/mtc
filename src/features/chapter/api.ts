import { apiClient } from '@/lib/api-client';

export const ChapterAPI = {
  // Giả định endpoint API của bạn là /chapters/:id. Nếu khác, hãy tự động điều chỉnh.
  getChapterDetail: async (chapterId: string) => {
    return apiClient.get(`/chapters/${chapterId}`);
  }
};
