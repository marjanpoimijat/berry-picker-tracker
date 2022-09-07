import { Text, View, StyleSheet, Dimensions } from "react-native";
import { registerRootComponent } from "expo";
import MapView from 'react-native-maps';

function App() {
  return (
    <View style={styles.container}>
      <Text>Berry picker tracker</Text>
      <MapView style={styles.map}/>
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
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default registerRootComponent(App);
