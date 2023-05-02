import { Circle } from "react-native-maps";
import { useTypedSelector } from "../../store";
import getCircleColor from "../../utils/circle";

/**
 * Draws waypoints as circles on the map.
 *
 * @returns {JSX.Element} A new Waypoints component.
 */
const Waypoints = (): JSX.Element => {
	const localWaypoints = useTypedSelector((state) => state.waypoints.localWaypoints);

	return (
		<>
			{localWaypoints.map((waypoint, index) => {
				if (waypoint.connection !== null) {
					return (
						<Circle
							center={{
								latitude: waypoint.latitude,
								longitude: waypoint.longitude,
							}}
							fillColor={getCircleColor(waypoint.connection)}
							key={index}
							radius={15}
						/>
					);
				}
			})}
		</>
	);
};

export default Waypoints;
