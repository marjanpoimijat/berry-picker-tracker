import { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { LocationObject } from "expo-location";
import * as Location from "expo-location";
import * as Cellular from "expo-cellular";

import { statusBarHeight } from "../constants";
import { languages } from "../languages";
import { useTypedSelector } from "../store";
import theme from "../styles/theme";

const styles = StyleSheet.create({
	infoContainer: {
		display: "flex",
		position: "absolute",
		backgroundColor: theme.colors.buttonBackgroundColor,
		top: statusBarHeight,
		alignSelf: "flex-start",
		borderRadius: 10,
		padding: 10,
		shadowColor: "black",
		shadowOffset: { width: 3, height: 3 },
		shadowOpacity: 0.8,
		shadowRadius: 20,
		elevation: 10,
		margin: 15,
	},
	textStyle: {
		fontSize: 13,
		fontWeight: "bold",
		color: "dimgrey",
	},
});

/**
 * Info container component to show information primarily for debugging
 * purposes. Some of the info should be deleted later, but perhaps keep the coordinates?
 */
const InfoContainer = (): JSX.Element => {
	const language = useTypedSelector((state) => state.language);
	const waypoints = useTypedSelector((state) => state.waypoints);
	const [curLocation, setCurLocation] = useState<LocationObject | null>(null);
	const [mobileNetCode, setMobileNetCode] = useState<string | null>(null);

	useEffect(() => {
		const interval = setInterval(async () => {
			const location = await Location.getLastKnownPositionAsync({});
			setCurLocation(location);
			const networkCode = await Cellular.getMobileNetworkCodeAsync();
			setMobileNetCode(networkCode);
		}, 3000);

		return () => clearInterval(interval);
	}, [curLocation]);

	return (
		<View style={styles.infoContainer}>
			<Text style={styles.textStyle}>
				{languages["Lat"][language]}:{" "}
				{curLocation === null
					? languages["NA"][language]
					: curLocation.coords.latitude}
			</Text>
			<Text style={styles.textStyle}>
				{languages["Lon"][language]}:{" "}
				{curLocation === null
					? languages["NA"][language]
					: curLocation.coords.longitude}
			</Text>
			<Text style={styles.textStyle}>
				{languages["NMC code"][language]}:{" "}
				{mobileNetCode === null
					? languages["No network"][language]
					: mobileNetCode}
			</Text>
			<Text style={styles.textStyle}>
				{languages["Local waypoints"][language]}:{" "}
				{waypoints.localWaypoints.length}
			</Text>
			<Text style={styles.textStyle}>
				{languages["Pending waypoints"][language]}:{" "}
				{waypoints.pendingWaypoints.length}
			</Text>
		</View>
	);
};

export default InfoContainer;
