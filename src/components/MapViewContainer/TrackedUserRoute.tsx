import { useEffect, useState } from "react";
import { View } from "react-native";
import { Marker, Polyline } from "react-native-maps";
import { getUsersLatestRoute } from "../../requests";
import Styles from "../../styles";
import { TrackedUserRouteProps, Waypoint, WaypointFromServer } from "../../types";
import { getColor } from "../../utils/colors";

/**
 * Renders a tracked user's route on the map.
 *
 * @param {TrackedUser} user A TrackedUser object containing data about the user to be tracked.
 * @returns {JSX.Element} A new TrackedUserRoute component.
 */
const TrackedUserRoute = ({ user }: TrackedUserRouteProps): JSX.Element => {
	const [usersWaypoints, setUsersWaypoints] = useState<null | Waypoint[]>(null);

	const findUserRoute = async () => {
		setUsersWaypoints(null);
		const data = await getUsersLatestRoute(user.userId);
		if (!data) return <></>;
		const waypoints: Waypoint[] = data.waypoints.map((waypoint: WaypointFromServer) => {
			return {
				...waypoint,
				routeId: waypoint.route_id,
			};
		});
		setUsersWaypoints(waypoints);
		console.log(`...Users route ID: ${data.routeId} found.`);
		console.log(`Route is: ${data.active}. Number of waypoints stored: ${data.waypoints.length}`);
	};

	useEffect(() => {
		findUserRoute();
	}, []);

	return (
		<>
			{usersWaypoints && (
				<>
					{user.routeVisible && (
						<>
							<Polyline
								coordinates={usersWaypoints}
								strokeColor={getColor(user.id)}
								strokeWidth={4}
								zIndex={2}
							/>
							<Polyline
								coordinates={usersWaypoints}
								strokeColor="black"
								strokeWidth={8}
								zIndex={1}
							/>
						</>
					)}
					{user.locationVisible && (
						<Marker
							coordinate={{
								latitude: usersWaypoints[usersWaypoints.length - 1]
									? usersWaypoints[usersWaypoints.length - 1].latitude
									: 60.204662,
								longitude: usersWaypoints[usersWaypoints.length - 1]
									? usersWaypoints[usersWaypoints.length - 1].longitude
									: 24.962535,
							}}
						>
							<View
								style={{
									...Styles.trackedUserDot,
									backgroundColor: getColor(user.id),
								}}
							/>
						</Marker>
					)}
				</>
			)}
		</>
	);
};

export default TrackedUserRoute;
