import { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { LocationObject } from "expo-location";
import * as Location from "expo-location";
import { languages } from "../languages";
import Styles from "../styles";
import { useTypedDispatch, useTypedSelector } from "../store";
import { setCoordinate } from "../reducers/coordinate-reducer";

/**
 * Coordinate container to show current coordinates at top of the map screen.
 */
const CoordinateContainer = (): JSX.Element => {
	const language = useTypedSelector((state) => state.language);
	const location = useTypedSelector((state) => state.coordinate);
	const [curLocation, setCurLocation] = useState<LocationObject | null>(null);

	const dispatch = useTypedDispatch();

	useEffect(() => {
		const interval = setInterval(async () => {
			const location = await Location.getLastKnownPositionAsync({});
			const initialState = {
				coords: {
					latitude: 60.204662,
					longitude: 24.962535,
					altitude: null,
					accuracy: null,
					altitudeAccuracy: null,
					heading: null,
					speed: null,
				},
				timestamp: 0,
			};
			if (location === null) {
				dispatch(setCoordinate(initialState));
			} else {
				dispatch(setCoordinate(location));
			}
			setCurLocation(location);
		}, 5000);

		return () => clearInterval(interval);
	}, [curLocation]);

	return (
		<View style={Styles.coordinateContainer}>
			<Text style={Styles.coordinateItems}>
				{location === null
					? languages["NA"][language]
					: location.coords.latitude > 0
					? `${location.coords.latitude} °N`
					: `${location.coords.latitude} °S`}
			</Text>
			<Text style={Styles.coordinateItems}>
				{location === null
					? languages["NA"][language]
					: location.coords.longitude > 0
					? `${location.coords.longitude} °E`
					: `${location.coords.longitude} °W`}
			</Text>
		</View>
	);
};

export default CoordinateContainer;
