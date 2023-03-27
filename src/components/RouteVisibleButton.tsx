import { TouchableOpacity } from "react-native";
import { RouteVisibleButtonProps } from "../types";
import Button from "./Button";

/**
 * A button used to toggle the visibility of a tracked user's route.
 *
 * @param {boolean} locationVisible Visibility of a tracked user's location and route.
 * @param {boolean} routeVisible Visibility of a tracked user's route.
 * @returns {JSX.Element} A new RouteVisibleButton component.
 */
const RouteVisibleButton = ({ locationVisible, routeVisible, handleRouteVisibleChange }: RouteVisibleButtonProps) => (
	<TouchableOpacity
		disabled={!locationVisible}
		onPress={() => handleRouteVisibleChange()}
	>
		<Button
			disabled={!locationVisible || !routeVisible}
			iconName="route"
		/>
	</TouchableOpacity>
);

export default RouteVisibleButton;
