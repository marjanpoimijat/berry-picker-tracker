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
	/** Function to start and stop route tracking */
	changeTracking: () => void;
	/** Function to toggle show route state true or false */
	changeShowRoute: () => void;
	/** State to determine whether route is visible or not */
	showRoute: boolean;
	/** State to determine whether route tracking has started or not */
	isTracking: boolean;
}

/**
 * Route button container component which contains buttons to
 * start / end route tracking and to toggle route visibility on / off.
 * Just preliminary styling and location on a screen.
 * @returns a tree of React elements
 */
const RouteButtonContainer = ({
	changeTracking,
	changeShowRoute,
	showRoute,
	isTracking,
}: Props): JSX.Element => {
	return (
		<View style={styles.buttonContainer}>
			<RouteButton
				onPress={changeTracking}
				text={isTracking ? "End route" : "Start route"}
			/>
			<RouteButton
				onPress={changeShowRoute}
				text={showRoute ? "Hide route" : "Show route"}
			/>
		</View>
	);
};

export default RouteButtonContainer;
