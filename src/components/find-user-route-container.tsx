import { View } from "react-native";
import Styles from "../styles";
import { Waypoint } from "../types";
import FindUserRouteMap from "./find-user-route-map";

/**
 * V
 */
const FindUserRouteContainer = ({
	usersWaypoints,
}: {
	usersWaypoints: Waypoint[] | null;
}): JSX.Element => {
	return (
		<View>
			{usersWaypoints ? (
				<FindUserRouteMap
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

export default FindUserRouteContainer;
