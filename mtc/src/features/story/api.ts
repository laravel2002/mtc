import { apiClient } from '@/lib/api-client';

export const StoryAPI = {
  getStories: async (page = 1, limit = 20) => {
    return apiClient.get(`/stories?page=${page}&limit=${limit}`);
  },
  getStoryDetail: async (slug: string) => {
    return apiClient.get(`/stories/${slug}`);
  }
};
