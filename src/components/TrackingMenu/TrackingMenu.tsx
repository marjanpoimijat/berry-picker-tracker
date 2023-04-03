import { Text, View } from "react-native";
import { languages } from "../../languages";
import { useTypedSelector } from "../../store";
import Styles from "../../styles";
import getTrackedUsersList from "../../utils/list";
import MasterButtonsContainer from "./MasterButtonsContainer";
import TrackedUserList from "./TrackedUserList";

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
				<MasterButtonsContainer />
				<TrackedUserList users={users} />
			</View>
		</View>
	);
};

export default TrackingMenu;
