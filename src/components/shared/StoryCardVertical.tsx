import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export const StoryCardVertical = ({ item }: { item: any }) => {
  const router = useRouter();
  return (
    <TouchableOpacity style={styles.card} onPress={() => router.push(`/story/${item.slug || '123'}`)}>
      <Image source={{ uri: item.coverImage || 'https://via.placeholder.com/150x200/333/fff' }} style={styles.image} />
      <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
      <Text style={styles.author} numberOfLines={1}>{item.author || item.genre}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: { width: 110, marginRight: 16 },
  image: { width: 110, height: 150, borderRadius: 8, backgroundColor: '#333' },
  title: { color: '#fff', fontSize: 14, fontWeight: '500', marginTop: 8 },
  author: { color: '#aaa', fontSize: 12, marginTop: 4 },
});
