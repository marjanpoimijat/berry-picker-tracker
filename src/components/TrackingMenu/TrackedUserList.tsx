import { View } from "react-native";
import Styles from "../../styles";
import { TrackedUserListProps } from "../../types";
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
				<View style={{ alignItems: "center" }}>
					<View style={Styles.divider} />
				</View>
			</View>
		))}
	</>
);

export default TrackedUserList;
