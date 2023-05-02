import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { languages } from "../../languages";
import { DotProps, TrackedUser, UsernameProps } from "../../types";
import { removeTrackedUser, updateTrackedUser } from "../../reducers/tracker-users-reducer";
import { useTypedDispatch, useTypedSelector } from "../../store";
import Styles from "../../styles";
import { createAlert } from "../../utils/alert";
import { getColor } from "../../utils/user-colors";
import LocationVisibleButton from "./LocationVisibleButton";
import RemoveUserButton from "./RemoveUserButton";
import RouteVisibleButton from "./RouteVisibleButton";

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
				updateTrackedUser({
					locationVisible: false,
					routeVisible: false,
					userId: userId,
				})
			);
		} else {
			setLocalLocationVisible(true);
			dispatch(
				updateTrackedUser({
					locationVisible: true,
					routeVisible: localRouteVisible,
					userId: userId,
				})
			);
		}
	};

	const handleRouteVisibleChange = () => {
		setLocalRouteVisible(!localRouteVisible);
		dispatch(
			updateTrackedUser({
				locationVisible: localLocationVisible,
				routeVisible: !localRouteVisible,
				userId: userId,
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

/**
 * A colored dot associated with each user.
 *
 * @param {string} id The userID
 * @returns {JSX.Element} A new Dot component.
 */
const Dot = ({ id }: DotProps): JSX.Element => (
	<View style={Styles.trackedUserDetailsDotContainer}>
		<View
			style={{
				...Styles.trackedUserDetailsDot,
				backgroundColor: getColor(id),
			}}
		/>
	</View>
);

/**
 * A styled username of a tracked user.
 *
 * @param {string} username Username of the user.
 * @returns {JSX.Element} A new Username component.
 */
const Username = ({ username }: UsernameProps): JSX.Element => (
	<Text style={Styles.trackedUserDetailsUsername}>{username}</Text>
);

export default TrackedUserDetails;
