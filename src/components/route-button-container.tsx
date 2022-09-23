import { View, StyleSheet } from "react-native";
import RouteButton from "./route-button";

const styles = StyleSheet.create({
	buttonContainer: {
		display: "flex",
		position: "absolute",
		alignSelf: "flex-start",
		marginLeft: 10,
		flexDirection: "column",
		bottom: 100,
	},
});

interface Props {
	/** Function to reset route coordinates */
	resetRouteCoordinates: () => void;
	/** Function to toggle show route state true or false */
	changeShowRoute: () => void;
	/** State to determine whether route is visible or not */
	showRoute: boolean;
}

/**
 * Route button container component which contains buttons to
 * toggle route visibility on / off and to reset route tracking.
 * Just preliminary styling and location on a screen.
 * @param {boolean} showRoute indicates if route is visible or not.
 * @returns a tree of React elements
 */
const RouteButtonContainer = ({
	resetRouteCoordinates,
	changeShowRoute,
	showRoute,
}: Props): JSX.Element => {
	return (
		<View style={styles.buttonContainer}>
			<RouteButton onPress={resetRouteCoordinates} text={"Reset route"} />
			<RouteButton
				onPress={changeShowRoute}
				text={showRoute ? "Hide route" : "Show route"}
			/>
		</View>
	);
};

export default RouteButtonContainer;
