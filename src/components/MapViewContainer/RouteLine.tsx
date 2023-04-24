import { Polyline } from "react-native-maps";
import { RouteLineProps } from "../../types";
import { getLineColor } from "../../utils/user-colors";

/**
 * Draws a user's route on the map as a line.
 * The line consists of a primary color and a black or white outline.
 *
 * @param {number} id The unique identifier of a user, determines the color. Value -1 refers to the local user.
 * @returns {JSX.Element} A new RouteLine component.
 */
const RouteLine = ({ id, waypoints }: RouteLineProps): JSX.Element => (
	<>
		<Polyline
			coordinates={waypoints}
			strokeColor={id === -1 ? "#4285f4" : getLineColor(id)}
			strokeWidth={4}
			zIndex={2}
		/>
		<Polyline
			coordinates={waypoints}
			strokeColor={id === -1 ? "white" : "black"}
			strokeWidth={8}
			zIndex={1}
		/>
	</>
);

export default RouteLine;
