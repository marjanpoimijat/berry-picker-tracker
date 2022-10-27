import { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { LocationObject } from "expo-location";
// import * as Location from "expo-location";
// import * as Cellular from "expo-cellular";

import { useTypedSelector } from "../store";
import theme from "../theme";

const styles = StyleSheet.create({
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
		height: 175,
		shadowColor: "black",
		shadowOffset: { width: 3, height: 3 },
		shadowOpacity: 0.8,
		shadowRadius: 20,
		elevation: 5,
		margin: 5,
	},
});

/**
 * Info container component to show information primarily for debugging
 * purposes. Some of the info should be deleted later, but perhaps keep the coordinates?
 */
const InfoContainer = (): JSX.Element => {
	const [curLocation] = useState<LocationObject | null>(null);
	const [mobileNetCode] = useState<string | null>(null);
	const waypoints = useTypedSelector((state) => state.waypoints);
	const routeId = useTypedSelector((state) => state.route.routeId);

	/**
	 * These are not updating currently. The problem is that the params this container
	 * at this container can not be updated unless the MapView component is active.
	 * Therefore changing to different views will cause memory leak warning.
	 * At the moment I don't see much reasons to fix this component.
	 */
	// useEffect(() => {
	// 	(async () => {
	// 		const location = await Location.getCurrentPositionAsync({});
	// 		setCurLocation(location);
	// 		const networkCode = await Cellular.getMobileNetworkCodeAsync();
	// 		setMobileNetCode(networkCode);
	// 	})();
	// }, []);

	return (
		<View style={styles.infoContainer}>
			<Text style={{ fontWeight: "bold" }}>Current location:</Text>
			<Text>
				-Latitude:{" "}
				{curLocation === null ? "disabled" : curLocation.coords.latitude}
			</Text>
			<Text>
				-Longitude:{" "}
				{curLocation === null ? "disabled" : curLocation.coords.longitude}
			</Text>
			<Text style={{ fontWeight: "bold" }}>Cellular network:</Text>
			<Text>
				-NMC code: {mobileNetCode === null ? "disabled" : mobileNetCode}
			</Text>
			<Text style={{ fontWeight: "bold" }}>
				Local waypoints: {waypoints.localWaypoints.length}
			</Text>
			<Text style={{ fontWeight: "bold" }}>
				Pending waypoints: {waypoints.pendingWaypoints.length}
			</Text>
			<Text style={{ fontWeight: "bold" }}>
				Route ID:{" "}
				{routeId ? `${routeId.substring(0, 11)}...` : "route not active"}
			</Text>
		</View>
	);
};

export default InfoContainer;
