import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

import Styles from "../styles";
import { colors } from "../utils/colors";
import { secureStoreUpdateUser } from "../utils/secure-store";

interface TrackedUser {
	id: number;
	userId: string;
	username: string;
}

const TrackedUserDetails = ({ id, userId, username }: TrackedUser) => {
	const [locationVisible, setLocationVisible] = useState<boolean>(true);
	const [routeVisible, setRouteVisible] = useState<boolean>(true);

	const handleLocationVisibleChange = () => {
		setLocationVisible(!locationVisible);
		secureStoreUpdateUser(userId);
	};

	return (
		<View style={Styles.trackedUserDetailsContainer}>
			<View style={Styles.trackedUserDetailsNameContainer}>
				<Dot id={id} />
				<Username username={username} />
			</View>
			<View style={Styles.trackedUserDetailsButtonContainer}>
				<LocationVisibleButton
					handleLocationVisibleChange={handleLocationVisibleChange}
					locationVisible={locationVisible}
				/>
				<RouteVisibleButton
					locationVisible={locationVisible}
					routeVisible={routeVisible}
					setRouteVisible={setRouteVisible}
				/>
			</View>
		</View>
	);
};

interface DotProps {
	id: number;
}

const Dot = ({ id }: DotProps) => (
	<View style={Styles.trackedUserDetailsDotContainer}>
		<View
			style={{
				...Styles.trackedUserDetailsDot,
				backgroundColor: colors[id],
			}}
		/>
	</View>
);

interface UsernameProps {
	username: string;
}

const Username = ({ username }: UsernameProps) => (
	<Text style={Styles.trackedUserDetailsUsername}>{username}</Text>
);

interface LocationVisibleButtonProps {
	locationVisible: boolean;
	handleLocationVisibleChange: () => void;
}

const LocationVisibleButton = ({
	locationVisible,
	handleLocationVisibleChange,
}: LocationVisibleButtonProps) => (
	<TouchableOpacity
		onPress={() => handleLocationVisibleChange()}
		style={{ marginRight: 20 }}
	>
		{locationVisible ? (
			<Button disabled={!locationVisible} name="eye" />
		) : (
			<Button disabled={!locationVisible} name="eye-slash" />
		)}
	</TouchableOpacity>
);

interface RouteVisibleButtonProps {
	locationVisible: boolean;
	routeVisible: boolean;
	setRouteVisible: (arg0: boolean) => void;
}

const RouteVisibleButton = ({
	locationVisible,
	routeVisible,
	setRouteVisible,
}: RouteVisibleButtonProps) => (
	<TouchableOpacity
		disabled={!locationVisible}
		onPress={() => setRouteVisible(!routeVisible)}
	>
		<Button disabled={!locationVisible || !routeVisible} name="route" />
	</TouchableOpacity>
);

interface ButtonProps {
	disabled: boolean;
	name: string;
}

const Button = ({ disabled, name }: ButtonProps) => (
	<Icon color={disabled ? "gray" : "black"} name={name} size={19} />
);

export default TrackedUserDetails;
