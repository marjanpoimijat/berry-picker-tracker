import { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Constants from "expo-constants";
import { registerRootComponent } from "expo";
import MapView, { Polyline } from "react-native-maps";
import * as Location from "expo-location";
import * as Cellular from "expo-cellular";
import Text from "./components/Text";
import Button from "./components/Button";
import NavigatorTab from "./components/NavigatorTab";

import theme from "./theme";

function App() {
	const [, setCurLocation] = useState(null);
	const [, setErrorMsg] = useState(null);
	const [lastLocation, setLastLocation] = useState(null);
	const [mobileNetworkCode, setMobileNetworkCode] = useState(null);
	const [routeCoordinates, setRouteCoordinates] = useState([]);
	const [showRoute, setShowRoute] = useState(true);

	useEffect(() => {
		(async () => {
			const { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				setErrorMsg("Permission to access location was denied");
				return;
			}

			const location = await Location.getCurrentPositionAsync({});
			setCurLocation(location);
		})();
	}, []);

	useEffect(() => {
		const interval = setInterval(async () => {
			const location = await Location.getLastKnownPositionAsync({});
			setLastLocation(location);
			addNewRouteCoordinate(location);

			console.log(lastLocation);
		}, 10 * 1000);

		return () => clearInterval(interval);
	}, [lastLocation]);

	useEffect(() => {
		const interval = setInterval(async () => {
			const networkCode = await Cellular.getMobileNetworkCodeAsync();
			setMobileNetworkCode(networkCode);
		}, 3 * 1000);

		return () => clearInterval(interval);
	}, [mobileNetworkCode]);

	const addNewRouteCoordinate = (location) => {
		const coordinate = {
			latitude: location.coords.latitude,
			longitude: location.coords.longitude,
		};
		setRouteCoordinates(routeCoordinates.concat(coordinate));
	};

	const resetRouteCoordinates = () => {
		setRouteCoordinates([]);
		console.log("coordinates reseted");
	};

	const changeShowRoute = () => {
		console.log(showRoute);
		setShowRoute(showRoute === true ? false : true);
	};

	return (
		<View style={styles.container}>
			<View style={styles.appHeader}>
				<Text fontSize="header" fontWeight="bold" color="textSecondary">
					Berry picker tracker
				</Text>
			</View>
			<MapView
				style={styles.map}
				showsUserLocation={true}
				initialRegion={{
					latitude: 60.204662,
					longitude: 24.962535,
					latitudeDelta: 0.01,
					longitudeDelta: 0.01,
				}}
			>
				<Polyline
					coordinates={routeCoordinates}
					strokeColor="black"
					strokeWidth={4}
				/>
			</MapView>
			<View style={styles.buttonContainer}>
				<Button onPress={resetRouteCoordinates} text={"Reset route"} />
				<Button
					onPress={changeShowRoute}
					text={showRoute === true ? "Hide route" : "Show route"}
				/>
			</View>
			<View style={styles.infoContainer}>
				<Text fontWeight="bold">Current location:</Text>
				<Text>
					-Latitude:{" "}
					{lastLocation === null
						? "not available"
						: lastLocation.coords.latitude}
				</Text>
				<Text>
					-Longitude:{" "}
					{lastLocation === null
						? "not available"
						: lastLocation.coords.longitude}
				</Text>
				<Text fontWeight="bold">Cellular network:</Text>
				<Text>
					-NMC code:{" "}
					{mobileNetworkCode === null
						? "Network not available"
						: mobileNetworkCode}
				</Text>
				<Text fontWeight="bold">
					Route location points: {routeCoordinates.length}
				</Text>
			</View>
			<View style={styles.navigator}>
				<NavigatorTab text="Map" />
				<NavigatorTab text="Setting" />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "flex-start",
		flexDirection: "column",
	},
	map: {
		width: Dimensions.get("window").width,
		height: Dimensions.get("window").height,
		top: Constants.statusBarHeight + 50,
	},
	buttonContainer: {
		display: "flex",
		position: "absolute",
		alignSelf: "flex-start",
		marginLeft: 10,
		flexDirection: "column",
		bottom: 100,
	},
	infoContainer: {
		display: "flex",
		position: "absolute",
		backgroundColor: theme.colors.buttonBackgroundColor,
		top: 100,
		alignSelf: "flex-start",
		marginLeft: 10,
		borderRadius: 20,
		padding: 15,
		textAlign: "center",
		height: 130,
		shadowColor: "black",
		shadowOffset: { width: 3, height: 3 },
		shadowOpacity: 0.8,
		shadowRadius: 20,
		elevation: 5,
		margin: 5,
	},
	appHeader: {
		height: 50,
		position: "absolute",
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		top: Constants.statusBarHeight,
		backgroundColor: theme.colors.primaryBackgroundColor,
	},
	navigator: {
		display: "flex",
		flexDirection: "row",
		height: 85,
		position: "absolute",
		width: "100%",
		justifyContent: "center",
		alignItems: "flex-start",
		marginTop: 20,
		paddingTop: 5,
		bottom: 0,
		backgroundColor: theme.colors.primaryBackgroundColor,
	},
});

export default registerRootComponent(App);
