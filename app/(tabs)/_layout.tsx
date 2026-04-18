import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from '../../hooks/use-color-scheme';

export default function TabsLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colorScheme === 'dark' ? '#a78bfa' : '#7c3aed',
        tabBarInactiveTintColor: colorScheme === 'dark' ? '#9ca3af' : '#6b7280',
        tabBarStyle: {
          backgroundColor: colorScheme === 'dark' ? '#1f2937' : '#ffffff',
          borderTopColor: colorScheme === 'dark' ? '#374151' : '#e5e7eb',
        },
      }}
    >
      {/* Tab Khám phá - màn hình chính */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Khám phá',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="compass" size={size} color={color} />
          ),
        }}
      />

      {/* Tab Tủ truyện - thư viện offline */}
      <Tabs.Screen
        name="library"
        options={{
          title: 'Tủ truyện',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="library" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
