import { Text, View } from "react-native";
import { languages } from "../../languages";
import { useTypedSelector } from "../../store";
import Styles, { topOffset } from "../../styles";
import getTrackedUsersList from "../../utils/list";
import MasterButtonsContainer from "./MasterButtonsContainer";
import NoTrackedUsersText from "./NoTrackedUsersText";
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
		<View
			style={
				toggled
					? users.length === 0
						? Styles.trackUsersMenuContainer
						: { ...Styles.trackUsersMenuContainer, top: topOffset - users.length * 55 }
					: { ...Styles.trackUsersMenuContainer, display: "none" }
			}
		>
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
