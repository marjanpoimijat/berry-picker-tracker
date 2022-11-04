import { View, StyleSheet, Alert } from "react-native";
import {
	startRoute,
	deactivateRoute,
	changeShowRoute,
} from "../reducers/route-reducer";
import { useTypedDispatch, useTypedSelector } from "../store";
import RouteButton from "./route-button";
import { resetWaypoints } from "../reducers/waypoint-reducer";

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
	const userId = useTypedSelector((state) => state.user.userId);
	const routeInfo = useTypedSelector((state) => state.route);
	const dispatch = useTypedDispatch();

	const changeRouteVisibility = () => {
		dispatch(changeShowRoute(routeInfo));
	};

	const changeTracking = () => {
		if (routeInfo.active) {
			dispatch(deactivateRoute(routeInfo.routeId));
			dispatch(resetWaypoints());
		} else {
			dispatch(startRoute(userId));
		}
	};

	/**
	 * Shows alert on pressing End route.
	 * Pressing OK ends route, CANCEL cancels operation.
	 */
	const alertOnEndRoute = () => {
		Alert.alert(
			"End tracking this route?",
			"Do you really want to end tracking?",
			[
				{
					text: "Cancel",
				},
				{
					text: "OK",
					onPress: () => {
						changeTracking();
					},
				},
			]
		);
	};

	/**
	 * On RouteButton onPress, chooses function pending on
	 * whether tracking active or not.
	 */
	const endRouteSelector = () => {
		if (routeInfo.active) {
			alertOnEndRoute();
		} else {
			changeTracking();
		}
	};

	return (
		<View style={styles.buttonContainer}>
			<RouteButton
				onPress={endRouteSelector}
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
