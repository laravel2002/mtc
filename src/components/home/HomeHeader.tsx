import { View, Text, StyleSheet } from 'react-native';

export const HomeHeader = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Khám Phá</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { paddingHorizontal: 16, paddingTop: 20, paddingBottom: 12, backgroundColor: '#121212' },
  title: { color: '#fff', fontSize: 28, fontWeight: 'bold' }
});
