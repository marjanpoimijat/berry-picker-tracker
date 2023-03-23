import { TouchableOpacity } from "react-native";
import { LocationVisibleButtonProps } from "../types";
import Button from "./button";

/**
 * Description placeholder
 *
 * @param {boolean} locationVisible Location visibility status.
 * @param {function} handleLocationVisibleChange A function to change the visibility when the button is pressed.
 * @returns {JSX.Element} A new LocationVisibleButton component.
 */
const LocationVisibleButton = ({ locationVisible, handleLocationVisibleChange }: LocationVisibleButtonProps) => (
	<TouchableOpacity onPress={() => handleLocationVisibleChange()}>
		{locationVisible ? (
			<Button
				disabled={!locationVisible}
				iconName="eye"
			/>
		) : (
			<Button
				disabled={!locationVisible}
				iconName="eye-slash"
			/>
		)}
	</TouchableOpacity>
);

export default LocationVisibleButton;
