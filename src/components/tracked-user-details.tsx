import { Text, View } from "react-native";
import Styles from "../styles";
import { colors } from "../utils/colors";

interface TrackedUser {
	id: number;
	username: string;
}

const TrackedUserDetails = ({ id, username }: TrackedUser) => {
	return (
		<View style={Styles.trackedUserDetailsContainer}>
			<View style={Styles.trackedUserDetailsDotContainer}>
				<View
					style={{
						...Styles.trackedUserDetailsDot,
						backgroundColor: colors[id],
					}}
				/>
			</View>
			<Text style={Styles.trackedUserDetailsUsername}>{username}</Text>
		</View>
	);
};

export default TrackedUserDetails;
