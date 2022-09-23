import { useState, useEffect } from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import Constants from "expo-constants";
import { registerRootComponent } from "expo";
import MapView, { LatLng, Polyline, UrlTile } from "react-native-maps";
import * as Location from "expo-location";
import * as Cellular from "expo-cellular";
import { LocationObject } from "expo-location";
import NavigatorTab from "./components/navigator-tab";
import RouteButtonContainer from "./components/route-button-container";

import theme from "./theme";

function App() {
	const [, setErrorMsg] = useState<string | null>(null);
	const [curLocation, setCurLocation] = useState<LocationObject | null>(null);
	const [mobileNetCode, setMobileNetCode] = useState<string | null>(null);
	const [routeCoordinates, setRouteCoordinates] = useState<Array<LatLng>>([]);
	const [showRoute, setShowRoute] = useState<boolean>(true);
	const [locationInterval, setLocationInterval] = useState<number>(10000);
	const [netCodeInterval, setNetCodeInterval] = useState<number>(10000);
	const [routeCoordInterval, setRouteCoordInterval] = useState<number>(3000);

	/**
	 * Requests permissions to use device location.
	 * Gets device location and sets current location state if permissions is allowed.
	 * Otherwise sets error message state which is not currently used anywhere.
	 */
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

	/**
	 *Gets devices last known location and sets current location state using
	 the interval according to the location interval state.
	 */
	useEffect(() => {
		const interval = setInterval(async () => {
			const location = await Location.getLastKnownPositionAsync({});
			setCurLocation(location);
		}, locationInterval);

		return () => clearInterval(interval);
	}, [curLocation]);

	/**
	 * Gets devices last known location and appends the coordinate points (latitude/longitude)
	 * into route coordinates state using the `AddNewRouteCoordinate()` function.
	 * Uses interval according to the route coordinate interval state.
	 */
	useEffect(() => {
		const interval = setInterval(async () => {
			const location = await Location.getLastKnownPositionAsync({});
			addNewRouteCoordinate(location);
		}, routeCoordInterval);

		return () => clearInterval(interval);
	}, [routeCoordinates]);

	/**
	 * Gets cellular network operators MNC (Mobile Network Code) and sets network code state
	 * using the interval according to the network code interval state.
	 * MNC code is a null if SIM card is not at the device or there is no cellular service available.
	 */
	useEffect(() => {
		const interval = setInterval(async () => {
			const networkCode = await Cellular.getMobileNetworkCodeAsync();
			setMobileNetCode(networkCode);
		}, netCodeInterval);

		return () => clearInterval(interval);
	}, [mobileNetCode]);

	/**
	 * Creates coordinate object from the location object and appends coordinate into
	 * route coordinate state which contains list of previously stored coordinate objects.
	 * @param location object which contains latitude and longitude values.
	 */
	const addNewRouteCoordinate = (location: LocationObject | null) => {
		if (location !== null) {
			const coordinate = {
				latitude: location.coords.latitude,
				longitude: location.coords.longitude,
			};
			setRouteCoordinates(routeCoordinates.concat(coordinate));
			console.log(routeCoordinates.length);
		}
	};

	/**
	 * Resets route coordinate state ie. sets state as empty list.
	 */
	const resetRouteCoordinates = () => {
		setRouteCoordinates([]);
		console.log("coordinates reseted");
	};

	/**
	 * Changes show route state to opposite boolean ie. from true to false
	 * and vice versa.
	 */
	const changeShowRoute = () => {
		console.log(showRoute);
		setShowRoute(!showRoute);
	};

	return (
		<View style={styles.container}>
			<View style={styles.appHeader}>
				<Text style={styles.textHeader}>Berry picker tracker</Text>
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
				<UrlTile
					urlTemplate="http://192.168.0.111:8000/nlsapi/{z}/{y}/{x}"
					tileSize={256}
					maximumZ={19}
					zIndex={-3}
				/>
				<Polyline
					coordinates={showRoute ? routeCoordinates : []}
					strokeColor="red"
					strokeWidth={4}
				/>
			</MapView>
			<RouteButtonContainer
				resetRouteCoordinates={resetRouteCoordinates}
				changeShowRoute={changeShowRoute}
				showRoute={showRoute}
			/>
			<View style={styles.infoContainer}>
				<Text style={{ fontWeight: "bold" }}>Current location:</Text>
				<Text>
					-Latitude:{" "}
					{curLocation === null ? "not available" : curLocation.coords.latitude}
				</Text>
				<Text>
					-Longitude:{" "}
					{curLocation === null
						? "not available"
						: curLocation.coords.longitude}
				</Text>
				<Text style={{ fontWeight: "bold" }}>Cellular network:</Text>
				<Text>
					-NMC code:{" "}
					{mobileNetCode === null ? "Network not available" : mobileNetCode}
				</Text>
				<Text style={{ fontWeight: "bold" }}>
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
	textHeader: {
		fontSize: theme.fontSizes.header,
		fontWeight: "bold",
		color: theme.colors.textSecondary,
	},
});

export default registerRootComponent(App);
