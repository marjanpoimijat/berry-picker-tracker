import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { LocationObject } from "expo-location";
import * as Location from "expo-location";
import * as Cellular from "expo-cellular";
import { languages } from "../languages";
import { useTypedSelector } from "../store";
import Styles from "../styles";

/**
 * Info container component to show information primarily for debugging
 * purposes. Some of the info should be deleted later, but perhaps keep the coordinates?
 *
 * @returns {JSX.Element} A new InfoContainer component.
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
		<View style={Styles.infoContainer}>
			<Text style={Styles.textStyle}>
				{languages["Lat"][language]}: {!curLocation ? languages["NA"][language] : curLocation.coords.latitude}
			</Text>
			<Text style={Styles.textStyle}>
				{languages["Lon"][language]}: {!curLocation ? languages["NA"][language] : curLocation.coords.longitude}
			</Text>
			<Text style={Styles.textStyle}>
				{languages["MNC code"][language]}: {!mobileNetCode ? languages["No network"][language] : mobileNetCode}
			</Text>
			<Text style={Styles.textStyle}>
				{languages["Local waypoints"][language]}: {waypoints.localWaypoints.length}
			</Text>
			<Text style={Styles.textStyle}>
				{languages["Pending waypoints"][language]}: {waypoints.pendingWaypoints.length}
			</Text>
		</View>
	);
};

export default InfoContainer;
