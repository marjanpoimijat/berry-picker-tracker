import { Text, View } from "react-native";
import { Marker } from "react-native-maps";
import Styles from "../../styles";
import { CoordinatesMarkerProps } from "../../types";
import { parseLatitude, parseLongitude } from "../../utils/coordinates";

/**
 * Displays a coordinate marker on the map where a user taps the screen.
 * Tapping the screen again will hide the marker.
 *
 * @param {Coordinate | null} coordinates Coordinates of the tapped location.
 * @returns {JSX.Element} A new CoordinatesMarker component.
 */
const CoordinatesMarker = ({ coordinates }: CoordinatesMarkerProps): JSX.Element => {
	if (!coordinates) return <></>;
	return (
		<>
			<Marker
				coordinate={coordinates}
				style={{ height: 50 }}
			>
				<View style={Styles.coordinateBoxContainer}>
					<View style={Styles.coordinateBox}>
						<Text>
							{parseLatitude(coordinates.latitude)}, {parseLongitude(coordinates.longitude)}
						</Text>
					</View>
				</View>
			</Marker>
			<Marker coordinate={coordinates}>
				<View style={Styles.coordinateDot} />
			</Marker>
		</>
	);
};

export default CoordinatesMarker;
