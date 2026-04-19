import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export const StoryCardHorizontal = ({ item }: { item: any }) => {
  const router = useRouter();
  return (
    <TouchableOpacity style={styles.card} onPress={() => router.push(`/story/${item.slug || '123'}`)}>
      <Image source={{ uri: item.coverImage || 'https://via.placeholder.com/100x140/333/fff' }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.genre}>{item.genre}</Text>
        <Text style={styles.stats}>{item.stats || 'Đang cập nhật'}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: { flexDirection: 'row', marginBottom: 16, paddingHorizontal: 16 },
  image: { width: 70, height: 100, borderRadius: 6, backgroundColor: '#333' },
  info: { flex: 1, marginLeft: 12, justifyContent: 'center' },
  title: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 6 },
  genre: { color: '#aaa', fontSize: 13, marginBottom: 6 },
  stats: { color: '#aaa', fontSize: 12 },
});
