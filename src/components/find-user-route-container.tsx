import { View, Text } from "react-native";
import Styles from "../styles";
import { Waypoint } from "../types";
import FindUserRouteMap from "./find-user-route-map";

/**
 * Shows info text at the bottom of the container and `FindUserRouteMap`
 * if there are waypoints stored for the user. Otherwise shows empty box instead of map.
 */
const FindUserRouteContainer = ({
	usersWaypoints,
	infoText,
}: {
	usersWaypoints: Waypoint[] | null;
	infoText: string;
}): JSX.Element => {
	return (
		<View style={Styles.smallMapViewContainer}>
			{usersWaypoints ? (
				<FindUserRouteMap
					usersLatestWaypoint={usersWaypoints[usersWaypoints.length - 1]}
					usersWaypoints={usersWaypoints}
				/>
			) : (
				<View style={Styles.smallMapView} />
			)}
			<View style={Styles.hideLogo}>
				<Text style={Styles.infoText}>{infoText}</Text>
			</View>
		</View>
	);
};

export default FindUserRouteContainer;
