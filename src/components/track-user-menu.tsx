import { useEffect, useState } from "react";
import { Text, View } from "react-native";

import { languages } from "../languages";
import { useTypedSelector } from "../store";
import Styles from "../styles";
import { TrackedUsers } from "../types";
import sortTrackedUserList from "../utils/sort";

import TrackedUserDetails from "./tracked-user-details";

/**
 * Menu for tracking tracking other users and their routes.
 */
const TrackUserMenu = (): JSX.Element => {
	const language = useTypedSelector((state) => state.language);
	const toggled = useTypedSelector((state) => state.ui.trackListVisible);
	const trackedUsers = useTypedSelector((state) => state.trackedUsers);
	const [users, setUsers] = useState<TrackedUsers>({});
	const sortedUsers = sortTrackedUserList(users);

	useEffect(() => {
		setUsers(trackedUsers);
	}, []);

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
				{sortedUsers.map((user, index) => (
					<View key={index}>
						<TrackedUserDetails
							id={index}
							locationVisible={user.locationVisible}
							routeVisible={user.routeVisible}
							userId={user.userId}
							username={user.username}
						/>
						<View style={{ alignItems: "center" }}>
							<View style={Styles.divider} />
						</View>
					</View>
				))}
			</View>
		</View>
	);
};

export default TrackUserMenu;
