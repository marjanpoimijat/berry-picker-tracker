import { View, StyleSheet } from "react-native";

import {
	startRoute,
	deactivateRoute,
	changeShowRoute,
} from "../reducers/route-reducer";
import { useTypedDispatch, useTypedSelector } from "../store";
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

/**
 * Route button container component which contains buttons to
 * start / end route tracking and to toggle route visibility on / off.
 * Just preliminary styling and location on a screen.
 */
const RouteButtonContainer = (): JSX.Element => {
	const user = useTypedSelector((state) => state.user);
	const routeInfo = useTypedSelector((state) => state.route);
	const dispatch = useTypedDispatch();

	const changeRouteVisibility = () => {
		dispatch(changeShowRoute());
	};

	const changeTracking = () => {
		if (routeInfo.active) {
			dispatch(deactivateRoute());
		} else {
			dispatch(startRoute(user));
		}
	};

	return (
		<View style={styles.buttonContainer}>
			<RouteButton
				onPress={changeTracking}
				text={routeInfo.active ? "End route" : "Start route"}
			/>
			<RouteButton
				onPress={changeRouteVisibility}
				text={routeInfo.showRoute ? "Hide route" : "Show route"}
			/>
		</View>
	);
};

export default RouteButtonContainer;
