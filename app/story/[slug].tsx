import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function StoryDetailScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>📕 Chi tiết truyện</Text>
        <Text style={styles.slug}>Slug: {slug}</Text>
        <Text style={styles.subtitle}>
          Thông tin truyện, danh sách chapter sẽ hiển thị ở đây.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#f8fafc',
    marginBottom: 8,
  },
  slug: {
    fontSize: 18,
    fontWeight: '600',
    color: '#a78bfa',
    marginBottom: 16,
    fontFamily: 'monospace',
  },
  subtitle: {
    fontSize: 16,
    color: '#94a3b8',
    textAlign: 'center',
    lineHeight: 24,
  },
});
