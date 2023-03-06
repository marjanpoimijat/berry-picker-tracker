import { Text, View } from "react-native";

import { useTypedSelector } from "../store";
import Styles from "../styles";

/**
 * Route button container component which contains buttons to
 * start / end route tracking and to toggle route visibility on / off.
 * Just preliminary styling and location on a screen.
 */
const TrackUserContainer = (): JSX.Element => {
	const toggled = useTypedSelector((state) => state.ui.trackListVisible);

	return (
		<View
			style={
				toggled
					? Styles.trackUsersContainer
					: { ...Styles.trackUsersContainer, display: "none" }
			}
		>
			<View style={Styles.trackUsersContent}>
				<Text>Tracking</Text>
			</View>
		</View>
	);
};

export default TrackUserContainer;
