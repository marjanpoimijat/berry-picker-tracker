import { useState } from "react";
import { Alert, Text, View } from "react-native";
import { languages } from "../languages";
import { DotProps, TrackedUser, UsernameProps } from "../types";
import { addTrackedUser, removeTrackedUser } from "../reducers/tracker-users-reducer";
import { useTypedDispatch, useTypedSelector } from "../store";
import Styles from "../styles";
import { colors } from "../utils/colors";
import LocationVisibleButton from "./location-visible-button";
import RouteVisibleButton from "./route-visible-button";
import RemoveButton from "./remove-button";

const TrackedUserDetails = ({ id, locationVisible, routeVisible, userId, username }: TrackedUser) => {
	const language = useTypedSelector((state) => state.language);
	const trackedUsers = useTypedSelector((state) => state.trackedUsers);
	const [localLocationVisible, setLocalLocationVisible] = useState<boolean>(locationVisible);
	const [localRouteVisible, setLocalRouteVisible] = useState<boolean>(routeVisible);

	const dispatch = useTypedDispatch();

	const handleLocationVisibleChange = () => {
		if (localLocationVisible) {
			setLocalLocationVisible(false);
			setLocalRouteVisible(false);
			dispatch(
				addTrackedUser({
					id: id,
					locationVisible: false,
					routeVisible: false,
					userId: userId,
					username: username,
				})
			);
		} else {
			setLocalLocationVisible(true);
			dispatch(
				addTrackedUser({
					id: id,
					locationVisible: true,
					routeVisible: localRouteVisible,
					userId: userId,
					username: username,
				})
			);
		}
		console.log(JSON.stringify(trackedUsers, null, 2));
	};

	const handleRouteVisibleChange = () => {
		setLocalRouteVisible(!localRouteVisible);
		dispatch(
			addTrackedUser({
				id: id,
				locationVisible: localLocationVisible,
				routeVisible: !localRouteVisible,
				userId: userId,
				username: username,
			})
		);
		console.log(JSON.stringify(trackedUsers, null, 2));
	};

	const handleRemoveButtonPress = () => {
		Alert.alert(
			languages["Removing a tracked user"][language],
			languages["Do you really want to remove this user from the list?"][language],
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
		console.log(JSON.stringify(trackedUsers, null, 2));
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

const Username = ({ username }: UsernameProps) => <Text style={Styles.trackedUserDetailsUsername}>{username}</Text>;

export default TrackedUserDetails;
