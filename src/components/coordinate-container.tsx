import { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { LocationObject } from "expo-location";
import * as Location from "expo-location";
import { languages } from "../languages";
import Styles from "../styles";
import { useTypedSelector } from "../store";

/**
 * Coordinate container to show current coordinates at top of the map screen.
 */
const CoordinateContainer = (): JSX.Element => {
	const language = useTypedSelector((state) => state.language);
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
				{curLocation === null
					? languages["NA"][language]
					: curLocation.coords.latitude > 0
					? `${curLocation.coords.latitude} °N`
					: `${curLocation.coords.latitude} °S`}
			</Text>
			<Text style={Styles.coordinateItems}>
				{curLocation === null
					? languages["NA"][language]
					: curLocation.coords.longitude > 0
					? `${curLocation.coords.longitude} °E`
					: `${curLocation.coords.longitude} °W`}
			</Text>
		</View>
	);
};

export default CoordinateContainer;
