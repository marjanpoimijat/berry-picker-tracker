import { View, Alert } from "react-native";
import {
	startRoute,
	deactivateRoute,
	changeShowRoute,
} from "../reducers/route-reducer";
import { useTypedDispatch, useTypedSelector } from "../store";
import Styles from "../styles";
import RouteButton from "./route-button";

/**
 * Route button container component which contains buttons to
 * start / end route tracking and to toggle route visibility on / off.
 * Just preliminary styling and location on a screen.
 */
const RouteButtonContainer = (): JSX.Element => {
	const user = useTypedSelector((state) => state.user);
	const routeInfo = useTypedSelector((state) => state.route);
	const dispatch = useTypedDispatch();

	const changeTracking = () => {
		if (routeInfo.active) {
			dispatch(deactivateRoute());
		} else {
			dispatch(startRoute(user));
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

	return (
		<View style={Styles.routeButtonContainer}>
			<RouteButton
				onPress={routeInfo.active ? alertOnEndRoute : changeTracking}
				text={routeInfo.active ? "End route" : "Start route"}
			/>
			<RouteButton
				onPress={() => dispatch(changeShowRoute())}
				text={routeInfo.showRoute ? "Hide route" : "Show route"}
			/>
		</View>
	);
};

export default RouteButtonContainer;
