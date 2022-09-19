import { useState, useEffect } from "react";
import { Text, View, StyleSheet, Dimensions, Image } from "react-native";
import { registerRootComponent } from "expo";
import MapView, { UrlTile } from "react-native-maps";
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
        region={{
          latitude: 60.2993067,
          longitude: 25.0646747,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <UrlTile
          urlTemplate="http://192.168.8.112:8000/nlsapi/{z}/{y}/{x}"
          tileSize={256}
          maximumZ={19}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    zIndex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width / 2,
    height: Dimensions.get("window").height / 2,
    marginTop: 50,
  },
});

export default registerRootComponent(App);
