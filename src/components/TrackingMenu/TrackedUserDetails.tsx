import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { languages } from "../../languages";
import { DotProps, TrackedUser, UsernameProps } from "../../types";
import { addTrackedUser, removeTrackedUser } from "../../reducers/tracker-users-reducer";
import { useTypedDispatch, useTypedSelector } from "../../store";
import Styles from "../../styles";
import { getColor } from "../../utils/colors";
import LocationVisibleButton from "./LocationVisibleButton";
import RemoveUserButton from "./RemoveUserButton";
import RouteVisibleButton from "./RouteVisibleButton";
import { createAlert } from "../../utils/alert";

/**
 * A container that displays a tracked user's name and visibility control buttons.
 *
 * @param {TrackedUser} { id, locationVisible, routeVisible, userId, username }
 * @returns {JSX.Element} A new TrackedUserDetails component.
 */
const TrackedUserDetails = ({ id, locationVisible, routeVisible, userId, username }: TrackedUser): JSX.Element => {
	const language = useTypedSelector((state) => state.language);
	const trackedUsers = useTypedSelector((state) => state.trackedUsers);
	const [localLocationVisible, setLocalLocationVisible] = useState<boolean>(locationVisible);
	const [localRouteVisible, setLocalRouteVisible] = useState<boolean>(routeVisible);

	const dispatch = useTypedDispatch();

	useEffect(() => {
		setLocalLocationVisible(trackedUsers[userId].locationVisible);
		setLocalRouteVisible(trackedUsers[userId].routeVisible);
	}, [trackedUsers]);

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
	};

	const handleRemoveUserButtonPress = () => {
		createAlert({
			cancellable: true,
			confirmText: languages["Remove"][language],
			infoText: languages["Do you really want to remove this user from the list?"][language],
			onPress: () => dispatch(removeTrackedUser(userId)),
			title: languages["Removing a tracked user"][language],
		});
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
				<RemoveUserButton handleRemoveUserButtonPress={handleRemoveUserButtonPress} />
			</View>
		</View>
	);
};

const Dot = ({ id }: DotProps) => (
	<View style={Styles.trackedUserDetailsDotContainer}>
		<View
			style={{
				...Styles.trackedUserDetailsDot,
				backgroundColor: getColor(id),
			}}
		/>
	</View>
);

const Username = ({ username }: UsernameProps) => <Text style={Styles.trackedUserDetailsUsername}>{username}</Text>;

export default TrackedUserDetails;
