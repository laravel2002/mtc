import { View, Text, StyleSheet } from 'react-native';

export const HeroBanner = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Banner Truyện Nổi Bật</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { 
    height: 160, 
    backgroundColor: '#1e1e1e', 
    marginHorizontal: 16, 
    borderRadius: 12, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 8 
  },
  text: { color: '#aaaaaa', fontSize: 16 }
});
