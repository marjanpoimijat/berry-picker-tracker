import { Text, View } from "react-native";
import Styles from "../styles";

interface TrackedUser {
	id: string;
}

const TrackedUserDetails = ({ id }: TrackedUser) => {
	return (
		<View style={Styles.trackedUserDetailsContainer}>
			<View style={Styles.trackedUserDetailsDotContainer}>
				<View style={Styles.trackedUserDetailsDot} />
			</View>
			<Text style={Styles.trackedUserDetailsUsername}>{id}</Text>
		</View>
	);
};

export default TrackedUserDetails;
