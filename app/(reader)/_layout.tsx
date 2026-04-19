import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';

export default function ReaderLayout() {
  return (
    <>
      <StatusBar hidden={true} /> {/* Ẩn thanh trạng thái điện thoại khi đọc */}
      <Stack screenOptions={{ headerShown: false, animation: 'fade' }}>
        <Stack.Screen name="[chapterId]" />
      </Stack>
    </>
  );
}
