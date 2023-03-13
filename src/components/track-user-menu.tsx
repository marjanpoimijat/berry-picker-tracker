import { useEffect, useState } from "react";
import { Text, View } from "react-native";

import { languages } from "../languages";
import { useTypedSelector } from "../store";
import Styles from "../styles";
import { secureStoreGetAllTrackedUsers } from "../utils/secure-store";

import TrackedUserDetails from "./tracked-user-details";

type TrackedUsers = {
	[key: string]: {
		alias: string;
		locationVisible: boolean;
		routeVisible: boolean;
		userId: string;
	};
};

/**
 * Menu for tracking tracking other users and their routes.
 */
const TrackUserMenu = (): JSX.Element => {
	const language = useTypedSelector((state) => state.language);
	const toggled = useTypedSelector((state) => state.ui.trackListVisible);
	const [localUsers, setLocalUsers] = useState<TrackedUsers>();

	const getUsers = async () => {
		const users = await secureStoreGetAllTrackedUsers();
		if (users) setLocalUsers(JSON.parse(users));
	};

	useEffect(() => {
		getUsers();
	}, []);

	const dataArray = localUsers ? Object.entries(localUsers) : [];
	const mappedUsers = dataArray.map(([key, value]) => ({
		alias: value.alias,
		id: key,
		locationVisible: value.locationVisible,
		routeVisible: value.routeVisible,
		userId: value.userId,
	}));

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
				{mappedUsers.map((user, index) => (
					<View key={index}>
						<TrackedUserDetails
							id={index}
							locationVisible={user.locationVisible}
							routeVisible={user.routeVisible}
							userId={user.userId}
							username={user.alias}
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
