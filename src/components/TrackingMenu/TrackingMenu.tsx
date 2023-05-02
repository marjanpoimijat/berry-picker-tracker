import { StyleProp, View, ViewStyle } from "react-native";
import { languages } from "../../languages";
import { useTypedSelector } from "../../store";
import Styles, { topOffset } from "../../styles";
import getTrackedUsersList from "../../utils/list";
import Title from "../Title";
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

	const style: StyleProp<ViewStyle> = toggled
		? users.length === 0
			? Styles.trackedUsersListContainer
			: { ...Styles.trackedUsersListContainer, top: topOffset - users.length * 55 }
		: { ...Styles.trackedUsersListContainer, display: "none" };

	return (
		<View style={style}>
			<View style={Styles.trackedUsersListContent}>
				<Title text={languages["Tracking"][language]} />
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
