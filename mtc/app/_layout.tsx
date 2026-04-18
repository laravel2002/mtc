import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-reanimated';

import { useColorScheme } from '../hooks/use-color-scheme';

// Khởi tạo QueryClient với cấu hình mặc định cho toàn app
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 phút
      retry: 2,
    },
  },
});

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack screenOptions={{ headerShown: false }}>
            {/* Tab chính: Khám phá & Tủ truyện */}
            <Stack.Screen name="(tabs)" />

            {/* Reader mode: Giao diện đọc truyện toàn màn hình, không cho swipe back */}
            <Stack.Screen
              name="(reader)"
              options={{ gestureEnabled: false }}
            />

            {/* Chi tiết truyện theo slug */}
            <Stack.Screen
              name="story/[slug]"
              options={{
                headerShown: true,
                title: 'Chi tiết truyện',
              }}
            />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
