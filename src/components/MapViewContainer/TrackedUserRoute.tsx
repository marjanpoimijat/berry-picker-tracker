import { useEffect, useState } from "react";
import { View } from "react-native";
import { Marker } from "react-native-maps";
import { getUsersLatestRoute } from "../../requests";
import Styles from "../../styles";
import { DecryptedWaypointFromServer, TrackedUserRouteProps, Waypoint } from "../../types";
import { getColor } from "../../utils/user-colors";
import RouteLine from "./RouteLine";

/**
 * Renders a tracked user's route on the map.
 *
 * @param {TrackedUser} user A TrackedUser object containing data about the user to be tracked.
 * @returns {JSX.Element} A new TrackedUserRoute component.
 */
const TrackedUserRoute = ({ user }: TrackedUserRouteProps): JSX.Element => {
	const [waypoints, setUsersWaypoints] = useState<null | Waypoint[]>(null);

	const findUserRoute = async () => {
		setUsersWaypoints(null);
		const data = await getUsersLatestRoute(user.userId);
		if (!data) return <></>;
		const waypoints: Waypoint[] = data.decryptedWaypoints.map((waypoint: DecryptedWaypointFromServer) => {
			return {
				...waypoint,
				routeId: waypoint.route_id,
			};
		});
		setUsersWaypoints(waypoints);
		console.log(`...Users route ID: ${data.routeId} found.`);
		console.log(`Route is: ${data.active}. Number of waypoints stored: ${data.decryptedWaypoints.length}`);
	};

	useEffect(() => {
		findUserRoute();
	}, []);

	if (!waypoints) return <></>;

	const coordinate = {
		latitude: waypoints[waypoints.length - 1].latitude ?? 60.204662,
		longitude: waypoints[waypoints.length - 1].longitude ?? 24.962535,
	};

	return (
		<>
			{user.routeVisible && (
				<RouteLine
					id={user.id}
					waypoints={waypoints}
				/>
			)}
			{user.locationVisible && (
				<Marker coordinate={coordinate}>
					<View style={{ ...Styles.trackedUserDot, backgroundColor: getColor(user.id) }} />
				</Marker>
			)}
		</>
	);
};

export default TrackedUserRoute;
