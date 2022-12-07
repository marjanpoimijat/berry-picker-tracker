import { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { LocationObject } from "expo-location";
import * as Location from "expo-location";
import Styles from "../styles";

/**
 * Coordinate container to show current coordinates at top of the map screen.
 */
const CoordinateContainer = (): JSX.Element => {
	const [curLocation, setCurLocation] = useState<LocationObject | null>(null);

	useEffect(() => {
		const interval = setInterval(async () => {
			const location = await Location.getLastKnownPositionAsync({});
			setCurLocation(location);
		}, 5000);

		return () => clearInterval(interval);
	}, [curLocation]);

	return (
		<View style={Styles.coordinateContainer}>
			<Text style={Styles.coordinateItems}>
				Lat: {curLocation === null ? "NA" : curLocation.coords.latitude}
			</Text>
			<Text style={Styles.coordinateItems}>
				Lon: {curLocation === null ? "NA" : curLocation.coords.longitude}
			</Text>
		</View>
	);
};

export default CoordinateContainer;
