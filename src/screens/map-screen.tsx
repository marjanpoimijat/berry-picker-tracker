import { useState, useEffect, useRef } from "react";
import { View, StyleSheet } from "react-native";
import * as Location from "expo-location";

import AppHeader from "../components/app-header";
import MapViewContainer from "../components/map-view-container";
import RouteButtonContainer from "../components/route-button-container";
import InfoContainer from "../components/info-container";
import useRoutes from "../hooks/use-routes";
import NavigatorTab from "../components/navigator-tab";
import { useTypedSelector } from "../store";

const MapScreen = () => {
	const userId: string | null = useTypedSelector((state) => state.user);
	const routeInfo = useTypedSelector((state) => state.route);

	// To be replaced...
	const [, setErrorMsg] = useState<string | null>(null);
	const [tempWaypoints, setTempWaypoints] = useState<
		Array<null | {
			routeId: string;
			location: Location.LocationObject;
			mobileNetCode: string;
		}>
	>([]);
	const [sendingInterval] = useState<number>(15000);
	const waypointSendRef = useRef<() => void>();

	// to be changed
	const { sendWaypoint } = useRoutes();

	/**
	 * Requests permissions to use device location.
	 * Gets device location and sets current location state if permissions is allowed.
	 * Otherwise sets error message state which is not currently used anywhere.
	 * Also gets cellular network operators MNC (Mobile Network Code), identifies user and sets user ID state.
	 * MNC code is a null if SIM card is not at the device or there is no cellular service available.
	 */
	useEffect(() => {
		(async () => {
			const { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				setErrorMsg("Permission to access location was denied");
				return;
			}
		})();
	}, []);

	/**
	 * Function to send waypointlist to the server. Sending is done with a set interval: @sendingInterval
	 * Current functionality: Checks if device is connected, resets waypointlist.
	 * TODO: Send waypointlist if connectivity is becoming bad.
	 */
	const sendWaypointToServer: () => void = async () => {
		//check connections...
		await sendWaypoint(tempWaypoints);
		console.log("sent waypoints to server");
		setTempWaypoints([]);
	};

	/**
	 * Sets a ticking interval for sending waypoint to the server if
	 * @isTracking has been set to true.
	 */
	useEffect(() => {
		waypointSendRef.current = sendWaypointToServer;
	}, [sendWaypointToServer]);

	useEffect(() => {
		function tick() {
			waypointSendRef.current();
		}
		if (routeInfo.active) {
			const send_id = setInterval(tick, sendingInterval);
			return () => clearInterval(send_id);
		}
	}, [routeInfo]);

	return (
		<View style={styles.container}>
			<AppHeader name={"Berry picker tracker"} userId={userId} />
			<MapViewContainer />
			<RouteButtonContainer />
			<InfoContainer />
			<NavigatorTab />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "flex-start",
		flexDirection: "column",
	},
});

export default MapScreen;
