import { Stack } from 'expo-router';

export default function ReaderLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        // Reader mode: ẩn hoàn toàn header, tạo trải nghiệm đọc toàn màn hình
        animation: 'slide_from_bottom',
      }}
    />
  );
}
