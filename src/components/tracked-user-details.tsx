import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

import Styles from "../styles";
import { colors } from "../utils/colors";
import { secureStoreUpdateTrackedUser } from "../utils/secure-store";

interface TrackedUser {
	id: number;
	locationVisible: boolean;
	routeVisible: boolean;
	userId: string;
	username: string;
}

const TrackedUserDetails = ({
	id,
	locationVisible,
	routeVisible,
	userId,
	username,
}: TrackedUser) => {
	const [localLocationVisible, setLocalLocationVisible] =
		useState<boolean>(locationVisible);
	const [localRouteVisible, setLocalRouteVisible] =
		useState<boolean>(routeVisible);

	const handleLocationVisibleChange = () => {
		if (localLocationVisible) {
			setLocalLocationVisible(false);
			setLocalRouteVisible(false);
			secureStoreUpdateTrackedUser(userId, false, false);
		} else {
			setLocalLocationVisible(true);
			secureStoreUpdateTrackedUser(userId, true, localRouteVisible);
		}
	};

	const handleRouteVisibleChange = () => {
		setLocalRouteVisible(!localRouteVisible);
		secureStoreUpdateTrackedUser(
			userId,
			localLocationVisible,
			!localRouteVisible
		);
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
					locationVisible={localLocationVisible}
				/>
				<RouteVisibleButton
					handleRouteVisibleChange={handleRouteVisibleChange}
					locationVisible={localLocationVisible}
					routeVisible={localRouteVisible}
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
	handleRouteVisibleChange: () => void;
}

const RouteVisibleButton = ({
	locationVisible,
	routeVisible,
	handleRouteVisibleChange,
}: RouteVisibleButtonProps) => (
	<TouchableOpacity
		disabled={!locationVisible}
		onPress={() => handleRouteVisibleChange()}
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
