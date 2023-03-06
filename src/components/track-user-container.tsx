import { View } from "react-native";

import { languages } from "../languages";
import { changeShowRoute, shareRoute } from "../reducers/route-reducer";
import { useTypedDispatch, useTypedSelector } from "../store";
import Styles from "../styles";
import RouteButton from "./route-button";
import ShareButton from "./share-button";

/**
 * Route button container component which contains buttons to
 * start / end route tracking and to toggle route visibility on / off.
 * Just preliminary styling and location on a screen.
 */
const TrackUserContainer = (): JSX.Element => {
	const language = useTypedSelector((state) => state.language);
	const user = useTypedSelector((state) => state.user);
	const routeInfo = useTypedSelector((state) => state.route);
	const toggled = useTypedSelector((state) => state.ui.trackListVisible);
	const dispatch = useTypedDispatch();

	return (
		<View
			style={
				toggled
					? Styles.trackUsersContainer
					: { ...Styles.trackUsersContainer, display: "none" }
			}
		>
			<RouteButton
				onPress={() => dispatch(changeShowRoute())}
				text={
					routeInfo.showRoute
						? languages["Hide route"][language]
						: languages["Show route"][language]
				}
			/>
			<ShareButton
				onPress={() => dispatch(shareRoute(user))}
				text={languages["Share route"][language]}
			/>
		</View>
	);
};

export default TrackUserContainer;
