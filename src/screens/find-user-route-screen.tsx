import { useEffect, useState } from "react";
import { Alert, View } from "react-native";

import AppHeader from "../components/app-header";
import FindUserRouteContainer from "../components/find-user-route-container";
import InputContainer from "../components/input-container";
import { languages } from "../languages";
import { setUserId } from "../reducers/find-user-reducer";
import { getUsersLatestRoute } from "../requests";
import { useTypedDispatch, useTypedSelector } from "../store";
import Styles from "../styles";
import { Waypoint, WaypointFromServer } from "../types";

const FindUserRouteScreen = () => {
	const language = useTypedSelector((state) => state.language);
	const userId = useTypedSelector((state) => state.userId);
	const [localUserId, setLocalUserId] = useState<string>(userId);
	const [usersWaypoints, setUsersWaypoints] = useState<null | Waypoint[]>(null);
	const [infoText, setInfoText] = useState<string>(
		languages["Search user's latest route by typing userID"][language]
	);

	const dispatch = useTypedDispatch();

	useEffect(() => {
		dispatch(setUserId(localUserId));
		if (userId) findUserRoute();
	}, []);

	useEffect(() => {
		dispatch(setUserId(localUserId));
	}, [localUserId]);

	const alertOnUserNotFound = () => {
		Alert.alert(
			languages["User not found"][language],
			`${languages["User not found with ID"][language]} "${userId}".`,
			[
				{
					text: languages["OK"][language],
				},
			]
		);
	};

	/**
	 * Searches users latest route from the server with user ID.
	 * Updates `usersWaypoint` state with list of latest route waypoints
	 * sets corresponding info text depending wheter latest route is active or not.
	 */
	const findUserRoute = async () => {
		// To re-adjust initial map region while updating the search
		setUsersWaypoints(null);

		console.log(`${languages["Finding user with id"][language]} ${userId}...`);
		const data = await getUsersLatestRoute(userId);
		if (data === undefined || data.routeId === undefined) {
			alertOnUserNotFound();
			return;
		}
		const waypoints: Waypoint[] = data.waypoints.map(
			(waypoint: WaypointFromServer) => {
				return {
					...waypoint,
					routeId: waypoint.route_id,
				};
			}
		);
		setInfoText(
			data.active
				? languages["User route is active"][language]
				: languages["User has no active route"][language]
		);
		setUsersWaypoints(waypoints);
		console.log(
			`...Users route ID: ${data.routeId} found. Route is: ${data.active}. Number of waypoints stored: ${data.waypoints.length}`
		);
	};

	return (
		<View style={Styles.screenContainer}>
			<AppHeader text={languages["Find user's latest route"][language]} />
			<InputContainer
				setUserId={setLocalUserId}
				userId={localUserId}
				findUserRoute={findUserRoute}
				buttonText={
					usersWaypoints
						? languages["Update"][language]
						: languages["Search"][language]
				}
			/>
			<FindUserRouteContainer
				usersWaypoints={usersWaypoints}
				infoText={infoText}
			/>
		</View>
	);
};

export default FindUserRouteScreen;
