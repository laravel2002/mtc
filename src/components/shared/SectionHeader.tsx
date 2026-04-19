import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const SectionHeader = ({ title, onPress }: { title: string; onPress?: () => void }) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
    {onPress && (
      <TouchableOpacity onPress={onPress}>
        <Ionicons name="chevron-forward" size={20} color="#fff" />
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 16, paddingHorizontal: 16 },
  title: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
});
