import { Text, View, StyleSheet } from "react-native";
import { registerRootComponent } from "expo";

function App() {
  return (
    <View style={styles.container}>
      <Text>Berry picker tracker</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default registerRootComponent(App);
