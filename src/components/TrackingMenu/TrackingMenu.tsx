import { Text, View } from "react-native";
import { languages } from "../../languages";
import { useTypedSelector } from "../../store";
import Styles from "../../styles";
import sortTrackedUserList from "../../utils/list";
import TrackUserMenuToggle from "./MasterButtonsContainer";
import TrackedUserDetails from "./TrackedUserDetails";

/**
 * Menu for tracking tracking other users and their routes.
 *
 * @returns {JSX.Element} A new TrackUserMenu component.
 */
const TrackingMenu = (): JSX.Element => {
	const language = useTypedSelector((state) => state.language);
	const toggled = useTypedSelector((state) => state.ui.trackingMenuVisible);
	const trackedUsers = useTypedSelector((state) => state.trackedUsers);
	const sortedUsers = sortTrackedUserList(trackedUsers);

	return (
		<View style={toggled ? Styles.trackUsersMenuContainer : { ...Styles.trackUsersMenuContainer, display: "none" }}>
			<View style={Styles.trackUsersMenuContent}>
				<View style={{ alignItems: "center" }}>
					<Text style={Styles.trackUsersMenuTitle}>{languages["Tracking"][language]}</Text>
				</View>
				<TrackUserMenuToggle />
				{sortedUsers.map((user, index) => (
					<View key={index}>
						<TrackedUserDetails
							id={user.id}
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

export default TrackingMenu;
