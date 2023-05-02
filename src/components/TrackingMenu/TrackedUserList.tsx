import { View } from "react-native";
import { TrackedUserListProps } from "../../types";
import Divider from "../Divider";
import TrackedUserDetails from "./TrackedUserDetails";

/**
 * A list of tracked users in the Tracking menu.
 *
 * @param {Array<TrackedUser>} users A list of tracked users.
 * @returns {JSX.Element} A new TrackeduserList component.
 */
const TrackedUserList = ({ users }: TrackedUserListProps): JSX.Element => (
	<>
		{users.map((user, index) => (
			<View key={index}>
				<TrackedUserDetails
					id={user.id}
					locationVisible={user.locationVisible}
					routeVisible={user.routeVisible}
					userId={user.userId}
					username={user.username}
				/>
				<Divider />
			</View>
		))}
	</>
);

export default TrackedUserList;
