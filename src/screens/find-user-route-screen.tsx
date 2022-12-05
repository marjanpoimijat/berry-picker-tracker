import { useState } from "react";
import { View, Text, TextInput } from "react-native";
import FindUserRouteContainer from "../components/find-user-route-container";
import RouteButton from "../components/route-button";
import { getUsersLatestRoute } from "../requests";
import { Waypoint, WaypointFromServer } from "../types";
import Styles from "../styles";

const FindUserRouteScreen = () => {
	const [userId, setUserId] = useState<string>("");
	const [usersWaypoints, setUsersWaypoints] = useState<null | Waypoint[]>(null);
	const [infoText, setInfoText] = useState<string>(
		"Search users latest route by typing userID"
	);

	/**
	 * Searches users latest route from the server with user ID.
	 * Updates `usersWaypoint` state with list of latest route waypoints
	 * sets corresponding info text depending wheter latest route is active or not.
	 */
	const findUserRoute = async () => {
		// To re-adjust initial map region while updating the search
		setUsersWaypoints(null);

		console.log(`Finding user with id ${userId}...`);
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
				data.active ? "User route is active" : "User has no active route"
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
			<View style={Styles.headerContainer}>
				<Text style={Styles.headerText}>Find users latest route</Text>
			</View>
			<View style={Styles.inputContainer}>
				<TextInput
					style={Styles.inputField}
					onChangeText={setUserId}
					value={userId}
					placeholder="userID"
				/>
				<RouteButton
					onPress={findUserRoute}
					text={usersWaypoints ? "Update" : "Search"}
				/>
			</View>
			<Text style={Styles.infoText}>{infoText}</Text>
			{usersWaypoints ? (
				<FindUserRouteContainer
					usersWaypoints={usersWaypoints}
					usersLatestWaypoint={usersWaypoints[usersWaypoints.length - 1]}
				/>
			) : (
				<View style={Styles.smallMapView} />
			)}
			<View style={Styles.hideLogo} />
		</View>
	);
};

export default FindUserRouteScreen;
