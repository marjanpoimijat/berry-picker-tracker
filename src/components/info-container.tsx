import { Text, View, StyleSheet } from "react-native";
import { LocationObject } from "expo-location";
import { LatLng } from "react-native-maps";
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
		height: 130,
		shadowColor: "black",
		shadowOffset: { width: 3, height: 3 },
		shadowOpacity: 0.8,
		shadowRadius: 20,
		elevation: 5,
		margin: 5,
	},
});

interface Props {
	curLocation: LocationObject | null;
	mobileNetCode: string | null;
	routeCoordinates: Array<LatLng>;
}

/**
 * Info container component to show information primarily for debugging
 * purposes. Should be deleted later...
 */
const InfoContainer = ({
	curLocation,
	mobileNetCode,
	routeCoordinates,
}: Props): JSX.Element => {
	return (
		<View style={styles.infoContainer}>
			<Text style={{ fontWeight: "bold" }}>Current location:</Text>
			<Text>
				-Latitude:{" "}
				{curLocation === null ? "not available" : curLocation.coords.latitude}
			</Text>
			<Text>
				-Longitude:{" "}
				{curLocation === null ? "not available" : curLocation.coords.longitude}
			</Text>
			<Text style={{ fontWeight: "bold" }}>Cellular network:</Text>
			<Text>
				-NMC code:{" "}
				{mobileNetCode === null ? "Network not available" : mobileNetCode}
			</Text>
			<Text style={{ fontWeight: "bold" }}>
				Route location points: {routeCoordinates.length}
			</Text>
		</View>
	);
};

export default InfoContainer;
