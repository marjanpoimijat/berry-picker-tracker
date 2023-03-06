import { Text, View } from "react-native";

import { useTypedSelector } from "../store";
import Styles from "../styles";

import TrackedUserDetails from "./tracked-user-details";

/**
 * Menu for tracking tracking other users and their routes.
 */
const TrackUserMenu = (): JSX.Element => {
	const toggled = useTypedSelector((state) => state.ui.trackListVisible);
	const exampleUsers = ["Riku", "Alexander", "Janne"];

	return (
		<View
			style={
				toggled
					? Styles.trackUsersMenuContainer
					: { ...Styles.trackUsersMenuContainer, display: "none" }
			}
		>
			<View style={Styles.trackUsersMenuContent}>
				<View style={{ alignItems: "center" }}>
					<Text style={Styles.trackUsersMenuTitle}>Tracking</Text>
				</View>
				{exampleUsers.map((user) => (
					<TrackedUserDetails id={user} key={user} />
				))}
			</View>
		</View>
	);
};

export default TrackUserMenu;
