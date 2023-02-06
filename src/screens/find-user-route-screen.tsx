import { useState } from "react";
import { View } from "react-native";

import AppHeader from "../components/app-header";
import FindUserRouteContainer from "../components/find-user-route-container";
import InputContainer from "../components/input-container";
import { languages } from "../languages";
import { getUsersLatestRoute } from "../requests";
import { useTypedSelector } from "../store";
import Styles from "../styles";
import { Waypoint, WaypointFromServer } from "../types";

const FindUserRouteScreen = () => {
	const language = useTypedSelector((state) => state.language);
	const [userId, setUserId] = useState<string>("");
	const [usersWaypoints, setUsersWaypoints] = useState<null | Waypoint[]>(null);
	const [infoText, setInfoText] = useState<string>(
		languages["Search user's latest route by typing userID"][language]
	);

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
		if (data !== undefined) {
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
		} else {
			console.log("...Failed");
		}
	};

	return (
		<View style={Styles.screenContainer}>
			<AppHeader text={languages["Find user's latest route"][language]} />
			<InputContainer
				setUserId={setUserId}
				userId={userId}
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
