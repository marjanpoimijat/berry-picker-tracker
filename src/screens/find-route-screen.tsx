import { useState } from "react";
import { View, Text, TextInput, StyleSheet, Dimensions } from "react-native";
import FindUserRouteContainer from "../components/find-user-route-container";
import RouteButton from "../components/route-button";
import { getUsersLatestRoute } from "../requests";
import { Waypoint, WaypointFromServer } from "../types";
import { statusBarHeight } from "../constants";

const FindRouteScreen = () => {
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
		<View style={styles.container}>
			<View style={styles.titleContainer}>
				<Text style={styles.headerStyle}>Find users latest route</Text>
			</View>
			<View style={styles.inputContainer}>
				<TextInput
					style={styles.input}
					onChangeText={setUserId}
					value={userId}
					placeholder="userID"
				/>
				<RouteButton
					onPress={findUserRoute}
					text={usersWaypoints ? "Update" : "Search"}
				/>
			</View>
			<Text style={styles.textStyle}>{infoText}</Text>
			{usersWaypoints ? (
				<FindUserRouteContainer
					usersWaypoints={usersWaypoints}
					usersLatestWaypoint={usersWaypoints[usersWaypoints.length - 1]}
				/>
			) : (
				<View style={styles.mapBox} />
			)}
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 0,
		width: "95%",
		height: Dimensions.get("window").height - 75,
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "column",
		top: statusBarHeight,
		paddingLeft: 10,
		paddingRight: 10,
	},
	titleContainer: {
		flex: 1,
		width: "100%",

		justifyContent: "center",
		flexDirection: "row",
		borderBottomColor: "lightgrey",
		borderBottomWidth: 1.5,
	},
	headerStyle: {
		fontSize: 20,
		color: "dimgrey",
		alignContent: "center",
		alignSelf: "center",
	},
	input: {
		width: "70%",
		borderWidth: 1,
		padding: 15,
		borderRadius: 10,
		textAlign: "center",
		height: 50,
		margin: 5,
	},
	inputContainer: {
		alignSelf: "center",
		flexDirection: "row",
		padding: 10,
		width: "95%",
	},
	textStyle: {
		fontSize: 15,
		color: "dimgrey",
		padding: 10,
		alignSelf: "center",
	},
	mapBox: {
		width: Dimensions.get("window").width * 0.9,
		height: Dimensions.get("window").height * 0.6,
		backgroundColor: "lightgrey",
		opacity: 0.7,
	},
});

export default FindRouteScreen;
