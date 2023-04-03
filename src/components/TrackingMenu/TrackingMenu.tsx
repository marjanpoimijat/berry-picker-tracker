import { Text, View } from "react-native";
import { languages } from "../../languages";
import { useTypedSelector } from "../../store";
import Styles from "../../styles";
import getTrackedUsersList from "../../utils/list";
import MasterButtonsContainer from "./MasterButtonsContainer";
import TrackedUserList from "./TrackedUserList";

const NoTrackedUsersText = () => (
	<View style={Styles.noTrackedUsersTextContainer}>
		<Text style={Styles.noTrackedUsersText}>No tracked users yet.</Text>
	</View>
);

/**
 * Menu for tracking tracking other users and their routes.
 *
 * @returns {JSX.Element} A new TrackUserMenu component.
 */
const TrackingMenu = (): JSX.Element => {
	const language = useTypedSelector((state) => state.language);
	const toggled = useTypedSelector((state) => state.ui.trackingMenuVisible);
	const trackedUsers = useTypedSelector((state) => state.trackedUsers);
	const users = getTrackedUsersList(trackedUsers);

	return (
		<View style={toggled ? Styles.trackUsersMenuContainer : { ...Styles.trackUsersMenuContainer, display: "none" }}>
			<View style={Styles.trackUsersMenuContent}>
				<View style={{ alignItems: "center" }}>
					<Text style={Styles.trackUsersMenuTitle}>{languages["Tracking"][language]}</Text>
				</View>
				{users.length === 0 ? (
					<NoTrackedUsersText />
				) : (
					<>
						<MasterButtonsContainer />
						<TrackedUserList users={users} />
					</>
				)}
			</View>
		</View>
	);
};

export default TrackingMenu;
