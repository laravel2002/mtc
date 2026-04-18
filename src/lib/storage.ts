import { createMMKV, type MMKV } from 'react-native-mmkv';

// Khởi tạo MMKV instance mặc định cho toàn app
export const storage: MMKV = createMMKV();

export const STORAGE_KEYS = {
  TOKEN: 'ACCESS_TOKEN',
  HISTORY: 'AG_READING_HISTORY',
};
