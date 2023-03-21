import { TouchableOpacity } from "react-native";
import { RouteVisibleButtonProps } from "../types";
import Button from "./button";

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
