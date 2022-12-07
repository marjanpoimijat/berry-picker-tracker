import { View, Text } from "react-native";
import Styles from "../styles";
import { Waypoint } from "../types";
import FindUserRouteMap from "./find-user-route-map";

/**
 * V
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
					usersWaypoints={usersWaypoints}
					usersLatestWaypoint={usersWaypoints[usersWaypoints.length - 1]}
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
