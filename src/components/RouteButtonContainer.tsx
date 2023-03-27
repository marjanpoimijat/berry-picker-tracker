import { Alert, View } from "react-native";
import { languages } from "../languages";
import { startRoute, deactivateRoute, changeShowRoute, shareRoute } from "../reducers/route-reducer";
import { useTypedDispatch, useTypedSelector } from "../store";
import Styles from "../styles";
import RouteButton from "./RouteButton";

/**
 * Route button container component which contains buttons to
 * start / end route tracking and to toggle route visibility on / off.
 * Just preliminary styling and location on a screen.
 *
 * @returns {JSX.Element} A new RouteButtonContainer component.
 */
const RouteButtonContainer = (): JSX.Element => {
	const language = useTypedSelector((state) => state.language);
	const user = useTypedSelector((state) => state.user);
	const routeInfo = useTypedSelector((state) => state.route);
	const toggled = useTypedSelector((state) => state.ui.routeButtonsVisible);
	const dispatch = useTypedDispatch();

	const changeTracking = () => {
		if (routeInfo.active) {
			dispatch(deactivateRoute());
		} else {
			dispatch(startRoute(user));
		}
	};

	const alertOnEndRoute = () => {
		Alert.alert(
			languages["End tracking this route?"][language],
			languages["Do you really want to end tracking?"][language],
			[
				{
					text: languages["Cancel"][language],
				},
				{
					onPress: () => {
						changeTracking();
					},
					text: languages["OK"][language],
				},
			]
		);
	};

	return (
		<View style={toggled ? Styles.routeButtonContainer : { ...Styles.routeButtonContainer, display: "none" }}>
			<RouteButton
				onPress={routeInfo.active ? alertOnEndRoute : changeTracking}
				text={routeInfo.active ? languages["End route"][language] : languages["Start route"][language]}
			/>
			<RouteButton
				onPress={() => dispatch(changeShowRoute())}
				text={routeInfo.showRoute ? languages["Hide route"][language] : languages["Show route"][language]}
			/>
			<RouteButton
				onPress={async () => dispatch(await shareRoute(user))}
				text={languages["Share route"][language]}
			/>
		</View>
	);
};

export default RouteButtonContainer;
