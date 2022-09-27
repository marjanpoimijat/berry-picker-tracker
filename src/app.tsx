import { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Constants from "expo-constants";
import { registerRootComponent } from "expo";
import MapView, { LatLng, Polyline, UrlTile } from "react-native-maps";
import * as Location from "expo-location";
import * as Cellular from "expo-cellular";
import { LocationObject } from "expo-location";
import AppHeader from "./components/app-header";
import RouteButtonContainer from "./components/route-button-container";
import InfoContainer from "./components/info-container";
import NavigatorTab from "./components/navigator-tab";

function App() {
	const [, setErrorMsg] = useState<string | null>(null);
	const [curLocation, setCurLocation] = useState<LocationObject | null>(null);
	const [mobileNetCode, setMobileNetCode] = useState<string | null>(null);
	const [routeCoordinates, setRouteCoordinates] = useState<Array<LatLng>>([]);
	const [showRoute, setShowRoute] = useState<boolean>(true);
	const [trackingInterval] = useState<number>(1000);
	const [isTracking, setIsTracking] = useState<boolean>(false);
	const [tripId, setTripId] = useState<string | null>(null);
	const trackingInfoRef = useRef<() => void>();

	/**
	 * Requests permissions to use device location.
	 * Gets device location and sets current location state if permissions is allowed.
	 * Otherwise sets error message state which is not currently used anywhere.
	 * Also cellular network operators MNC (Mobile Network Code) and sets network code state
	 * using the interval according to the network code interval state.
	 * MNC code is a null if SIM card is not at the device or there is no cellular service available.
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
			const networkCode = await Cellular.getMobileNetworkCodeAsync();
			setMobileNetCode(networkCode);
		})();
	}, []);

	const updateTrackingInfo: () => void = async () => {
		const location = await Location.getLastKnownPositionAsync({});
		setCurLocation(location);
		addNewRouteCoordinate(location);
		const networkCode = await Cellular.getMobileNetworkCodeAsync();
		setMobileNetCode(networkCode);
	};

	useEffect(() => {
		trackingInfoRef.current = updateTrackingInfo;
	}, [updateTrackingInfo]);

	useEffect(() => {
		function tick() {
			trackingInfoRef.current();
		}
		if (isTracking) {
			const id = setInterval(tick, trackingInterval);
			return () => clearInterval(id);
		}
	}, [isTracking]);

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
		}
	};

	const changeTracking = () => {
		setRouteCoordinates([]);
		setIsTracking(!isTracking);
		setTripId(tripId ? null : "non-unique-trip-id-1234");
		console.log(isTracking ? "tracking started" : "tracking ended");
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
			<AppHeader name={"Berry picker tracker"} />
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
				changeTracking={changeTracking}
				changeShowRoute={changeShowRoute}
				showRoute={showRoute}
				isTracking={isTracking}
				tripId={tripId}
			/>
			<InfoContainer
				curLocation={curLocation}
				mobileNetCode={mobileNetCode}
				routeCoordinates={routeCoordinates}
			/>
			<NavigatorTab />
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
});

export default registerRootComponent(App);
