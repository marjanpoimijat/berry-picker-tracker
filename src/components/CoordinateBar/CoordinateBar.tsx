import { useEffect } from "react";
import { Text, View } from "react-native";
import * as Location from "expo-location";
import { languages } from "../../languages";
import { setCurrentLocation } from "../../reducers/current-location-reducer";
import Styles from "../../styles";
import { useTypedDispatch, useTypedSelector } from "../../store";
import { parseLatitude, parseLongitude } from "../../utils/coordinates";

/**
 * A bar that displays the user's current coordinates.
 * The accuracy is five decimal points.
 *
 * Example coordinates: 60.20457 °N, 24.96120 °E.
 *
 * @returns {JSX.Element} A new CoordinateBar component.
 */
const CoordinateBar = (): JSX.Element => {
	const language = useTypedSelector((state) => state.language);
	const currentLocation = useTypedSelector((state) => state.currentLocation);

	const dispatch = useTypedDispatch();

	useEffect(() => {
		const interval = setInterval(async () => {
			const location = await Location.getLastKnownPositionAsync({});
			const initialState = {
				coords: {
					accuracy: null,
					altitude: null,
					altitudeAccuracy: null,
					heading: null,
					latitude: 60.204662,
					longitude: 24.962535,
					speed: null,
				},
				mocked: false,
				timestamp: 0,
			};
			if (location === null) {
				dispatch(setCurrentLocation(initialState));
			} else {
				dispatch(setCurrentLocation(location));
			}
		}, 5000);

		return () => clearInterval(interval);
	}, []);

	return (
		<View style={Styles.coordinateContainer}>
			<Text style={Styles.coordinateItems}>
				{!currentLocation ? languages["NA"][language] : parseLatitude(currentLocation.coords.latitude)}
			</Text>
			<Text style={Styles.coordinateItems}>
				{!currentLocation ? languages["NA"][language] : parseLongitude(currentLocation.coords.longitude)}
			</Text>
		</View>
	);
};

export default CoordinateBar;
