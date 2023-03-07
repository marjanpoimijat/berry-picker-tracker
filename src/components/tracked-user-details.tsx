import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

import Styles from "../styles";
import { colors } from "../utils/colors";

interface TrackedUser {
	id: number;
	username: string;
}

const TrackedUserDetails = ({ id, username }: TrackedUser) => {
	const [locationVisible, setLocationVisible] = useState<boolean>(true);
	const [routeVisible, setRouteVisible] = useState<boolean>(true);

	return (
		<View style={Styles.trackedUserDetailsContainer}>
			<View style={Styles.trackedUserDetailsNameContainer}>
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
			<View style={Styles.trackedUserDetailsButtonContainer}>
				<TouchableOpacity
					onPress={() => setLocationVisible(!locationVisible)}
					style={{ marginRight: 20 }}
				>
					{locationVisible ? (
						<Button disabled={!locationVisible} name="eye" />
					) : (
						<Button disabled={!locationVisible} name="eye-slash" />
					)}
				</TouchableOpacity>
				<TouchableOpacity
					disabled={!locationVisible}
					onPress={() => setRouteVisible(!routeVisible)}
				>
					<Button disabled={!locationVisible || !routeVisible} name="route" />
				</TouchableOpacity>
			</View>
		</View>
	);
};

interface ButtonProps {
	disabled: boolean;
	name: string;
}

const Button = ({ disabled, name }: ButtonProps) => (
	<Icon color={disabled ? "gray" : "black"} name={name} size={19} />
);

export default TrackedUserDetails;
