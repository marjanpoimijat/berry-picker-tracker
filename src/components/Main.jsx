import { Text, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <Text>Berry picker tracker</Text>
    </View>
  );
};

export default Main;