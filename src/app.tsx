import { useState, useEffect } from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import { registerRootComponent } from "expo";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import * as Cellular from "expo-cellular";

function App() {
  const [curLocation, setCurLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [lastLocation, setLastLocation] = useState(null);
  const [mobileNetworkCode, setMobileNetworkCode] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurLocation(location);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (curLocation) {
    text = JSON.stringify(curLocation);
  }

  useEffect(() => {
    const interval = setInterval(async () => {
      let location = await Location.getLastKnownPositionAsync({});
      setLastLocation(location);

      console.log(lastLocation);
    }, 10 * 1000);

    return () => clearInterval(interval);
  }, [lastLocation]);

  /**
   * Checks and sets cellular service providers MNC code every 3 second interval.
   * MNC is null when outside of cellular service range or if SIM card is removed.
   * @param {string} networkCode  Mobile network code of cellular service provider.
   */
  useEffect(() => {
    const interval = setInterval(async () => {
      let networkCode = await Cellular.getMobileNetworkCodeAsync();
      setMobileNetworkCode(networkCode);

      console.log(mobileNetworkCode);
      console.log(typeof mobileNetworkCode);
    }, 3 * 1000);

    return () => clearInterval(interval);
  }, [mobileNetworkCode]);

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
