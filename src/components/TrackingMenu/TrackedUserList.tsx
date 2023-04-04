import { View } from "react-native";
import { TrackedUserListProps } from "../../types";
import Divider from "../Divider";
import TrackedUserDetails from "./TrackedUserDetails";

const TrackedUserList = ({ users }: TrackedUserListProps) => (
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
