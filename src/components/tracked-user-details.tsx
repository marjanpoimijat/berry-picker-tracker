import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import {
	ButtonProps,
	DotProps,
	LocationVisibleButtonProps,
	RouteVisibleButtonProps,
	TrackedUserFull,
	UsernameProps,
} from "../../types";
import { addNewTrackedUser } from "../reducers/tracker-users-reducer";
import { useTypedDispatch } from "../store";

import Styles from "../styles";
import { colors } from "../utils/colors";
import { secureStoreUpdateTrackedUser } from "../utils/secure-store";

const TrackedUserDetails = ({
	id,
	locationVisible,
	routeVisible,
	userId,
	username,
}: TrackedUserFull) => {
	const [localLocationVisible, setLocalLocationVisible] =
		useState<boolean>(locationVisible);
	const [localRouteVisible, setLocalRouteVisible] =
		useState<boolean>(routeVisible);

	const dispatch = useTypedDispatch();

	const handleLocationVisibleChange = () => {
		if (localLocationVisible) {
			setLocalLocationVisible(false);
			setLocalRouteVisible(false);
			dispatch(
				addNewTrackedUser({
					alias: username,
					locationVisible: false,
					routeVisible: false,
					userId: userId,
				})
			);
			secureStoreUpdateTrackedUser(userId, false, false);
		} else {
			setLocalLocationVisible(true);
			dispatch(
				addNewTrackedUser({
					alias: username,
					locationVisible: true,
					routeVisible: localRouteVisible,
					userId: userId,
				})
			);
			secureStoreUpdateTrackedUser(userId, true, localRouteVisible);
		}
	};

	const handleRouteVisibleChange = () => {
		setLocalRouteVisible(!localRouteVisible);
		dispatch(
			addNewTrackedUser({
				alias: username,
				locationVisible: localLocationVisible,
				routeVisible: !localRouteVisible,
				userId: userId,
			})
		);
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

const Dot = ({ id }: DotProps) => (
	<View style={Styles.trackedUserDetailsDotContainer}>
		<View
			style={{
				...Styles.trackedUserDetailsDot,
				backgroundColor: colors[id % colors.length],
			}}
		/>
	</View>
);

const Username = ({ username }: UsernameProps) => (
	<Text style={Styles.trackedUserDetailsUsername}>{username}</Text>
);

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

const Button = ({ disabled, name }: ButtonProps) => (
	<Icon color={disabled ? "gray" : "black"} name={name} size={19} />
);

export default TrackedUserDetails;
