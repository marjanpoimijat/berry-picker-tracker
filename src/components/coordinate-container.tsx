import { useEffect } from "react";
import { Text, View } from "react-native";
import * as Location from "expo-location";
import { languages } from "../languages";
import { setLocation } from "../reducers/location-reducer";
import Styles from "../styles";
import { useTypedDispatch, useTypedSelector } from "../store";

/**
 * Coordinate container to show current coordinates at top of the map screen.
 */
const CoordinateContainer = (): JSX.Element => {
	const language = useTypedSelector((state) => state.language);
	const currentLocation = useTypedSelector((state) => state.location);

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
				dispatch(setLocation(initialState));
			} else {
				dispatch(setLocation(location));
			}
		}, 5000);

		return () => clearInterval(interval);
	}, []);

	return (
		<View style={Styles.coordinateContainer}>
			<Text style={Styles.coordinateItems}>
				{currentLocation === null
					? languages["NA"][language]
					: currentLocation.coords.latitude > 0
					? `${currentLocation.coords.latitude} °N`
					: `${currentLocation.coords.latitude} °S`}
			</Text>
			<Text style={Styles.coordinateItems}>
				{currentLocation === null
					? languages["NA"][language]
					: currentLocation.coords.longitude > 0
					? `${currentLocation.coords.longitude} °E`
					: `${currentLocation.coords.longitude} °W`}
			</Text>
		</View>
	);
};

export default CoordinateContainer;
