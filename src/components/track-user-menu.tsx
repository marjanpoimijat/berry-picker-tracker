import { Text, View } from "react-native";

import { languages } from "../languages";
import { useTypedSelector } from "../store";
import Styles from "../styles";

import TrackedUserDetails from "./tracked-user-details";

/**
 * Menu for tracking tracking other users and their routes.
 */
const TrackUserMenu = (): JSX.Element => {
	const language = useTypedSelector((state) => state.language);
	const toggled = useTypedSelector((state) => state.ui.trackListVisible);
	const exampleUsers = [
		"Riku",
		"Alexander",
		"Janne",
		"Jenni",
		"Jyri",
		"Mikael",
		"Samu",
		"Petri",
		"Ashwin",
	];

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
					<Text style={Styles.trackUsersMenuTitle}>
						{languages["Tracking"][language]}
					</Text>
				</View>
				{exampleUsers.map((user, index) => (
					<>
						<TrackedUserDetails id={index} key={index} username={user} />
						<View style={{ alignItems: "center" }}>
							<View style={Styles.divider} />
						</View>
					</>
				))}
			</View>
		</View>
	);
};

export default TrackUserMenu;
