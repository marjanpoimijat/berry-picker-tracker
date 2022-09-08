import { useState, useEffect } from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import { registerRootComponent } from "expo";
import MapView from "react-native-maps";
import * as Location from "expo-location";

function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={styles.container}>
      <Text>Berry picker tracker</Text>
      <MapView
        style={styles.map}
        showsUserLocation={true}
        initialRegion={{
          latitude: 60.204662,
          longitude: 24.962535,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      />
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
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    marginTop: 50,
  },
});

export default registerRootComponent(App);
