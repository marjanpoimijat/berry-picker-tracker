import { View, StyleSheet } from "react-native";
import MapButton from "./map-button";
import FindUserRouteButton from "./find-user-route-button";
import SettingsButton from "./settings-button";

const styles = StyleSheet.create({
	navigatorTab: {
		display: "flex",
		flexDirection: "row",
		height: 70,
		position: "absolute",
		width: "100%",
		justifyContent: "center",
		alignItems: "flex-start",
		marginTop: 10,
		paddingTop: 3,
		paddingBottom: 3,
		bottom: 0,
		backgroundColor: "#008b8b",
	},
});

/**
 * Navigator tab located at the bottom of the screen which contains
 * navigator buttons to navigate into other views.
 */
const NavigatorTab = (): JSX.Element => {
	return (
		<View style={styles.navigatorTab}>
			<MapButton text="Map" />
			<FindUserRouteButton text="Find" />
			<SettingsButton text="Settings" />
		</View>
	);
};

export default NavigatorTab;
