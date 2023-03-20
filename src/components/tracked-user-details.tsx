import { useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import {
	ButtonProps,
	DotProps,
	LocationVisibleButtonProps,
	RemoveButtonProps,
	RouteVisibleButtonProps,
	TrackedUserFull,
	UsernameProps,
} from "../../types";
import { languages } from "../languages";
import {
	addTrackedUser,
	removeTrackedUser,
} from "../reducers/tracker-users-reducer";
import { useTypedDispatch, useTypedSelector } from "../store";
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
	const language = useTypedSelector((state) => state.language);
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
				addTrackedUser({
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
				addTrackedUser({
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
			addTrackedUser({
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

	const handleRemoveButtonPress = () => {
		Alert.alert(
			languages["Removing a tracked user"][language],
			languages["Do you really want to remove this user from the list?"][
				language
			],
			[
				{
					text: languages["Cancel"][language],
				},
				{
					onPress: () => {
						dispatch(removeTrackedUser(userId));
					},
					text: languages["Remove"][language],
				},
			]
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
				<RemoveButton handleRemoveButtonPress={handleRemoveButtonPress} />
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
	<TouchableOpacity onPress={() => handleLocationVisibleChange()}>
		{locationVisible ? (
			<Button disabled={!locationVisible} iconName="eye" />
		) : (
			<Button disabled={!locationVisible} iconName="eye-slash" />
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
		<Button disabled={!locationVisible || !routeVisible} iconName="route" />
	</TouchableOpacity>
);

const RemoveButton = ({ handleRemoveButtonPress }: RemoveButtonProps) => (
	<TouchableOpacity onPress={() => handleRemoveButtonPress()}>
		<Button disabled={false} iconName="trash-alt" />
	</TouchableOpacity>
);

const Button = ({ disabled, iconName }: ButtonProps) => (
	<Icon
		color={disabled ? "gray" : "black"}
		name={iconName}
		size={19}
		style={{ marginLeft: 20 }}
	/>
);

export default TrackedUserDetails;
