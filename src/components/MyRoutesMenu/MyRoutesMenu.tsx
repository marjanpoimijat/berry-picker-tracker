import { View } from "react-native";
import { languages } from "../../languages";
import { startRoute, deactivateRoute, changeShowRoute, shareRoute } from "../../reducers/route-reducer";
import { useTypedDispatch, useTypedSelector } from "../../store";
import Styles from "../../styles";
import { createAlert } from "../../utils/alert";
import RouteButton from "./RouteButton";

/**
 * A menu for controlling the user's own route.
 *
 * The menu consists of three buttons:
 * - Start/stop route
 * - Show/hide route
 * - Share route
 *
 * @returns {JSX.Element} A new MyRoutesMenu component.
 */
const MyRoutesMenu = (): JSX.Element => {
	const language = useTypedSelector((state) => state.language);
	const user = useTypedSelector((state) => state.user);
	const routeInfo = useTypedSelector((state) => state.route);
	const toggled = useTypedSelector((state) => state.ui.myRoutesMenuVisible);
	const dispatch = useTypedDispatch();

	const changeTracking = () => {
		if (routeInfo.active) {
			dispatch(deactivateRoute());
		} else {
			dispatch(startRoute(user));
		}
	};

	const alertOnEndRoute = () => {
		createAlert({
			cancellable: true,
			confirmText: languages["OK"][language],
			infoText: languages["Do you really want to end tracking?"][language],
			onPress: () => changeTracking(),
			title: languages["End tracking this route"][language],
		});
	};

	return (
		<View style={toggled ? Styles.routeButtonContainer : { ...Styles.routeButtonContainer, display: "none" }}>
			<RouteButton
				iconName={routeInfo.active ? "stop" : "play"}
				onPress={routeInfo.active ? alertOnEndRoute : changeTracking}
				text={routeInfo.active ? languages["End route"][language] : languages["Start route"][language]}
			/>
			<RouteButton
				iconName={routeInfo.showRoute ? "eye-slash" : "eye"}
				onPress={() => dispatch(changeShowRoute())}
				text={routeInfo.showRoute ? languages["Hide route"][language] : languages["Show route"][language]}
			/>
			<RouteButton
				iconName="share"
				onPress={async () => dispatch(await shareRoute(user))}
				text={languages["Share route"][language]}
			/>
		</View>
	);
};

export default MyRoutesMenu;
