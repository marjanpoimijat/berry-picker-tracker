import { TouchableOpacity } from "react-native";
import { LocationVisibleButtonProps } from "../../types";
import ButtonIcon from "./ButtonIcon";

/**
 * A button for toggling the visibility of a user's location.
 *
 * @param {boolean} locationVisible Location visibility status.
 * @param {function} handleLocationVisibleChange A function to change the visibility when the button is pressed.
 * @returns {JSX.Element} A new LocationVisibleButton component.
 */
const LocationVisibleButton = ({ locationVisible, handleLocationVisibleChange }: LocationVisibleButtonProps) => (
	<TouchableOpacity onPress={() => handleLocationVisibleChange()}>
		{locationVisible ? (
			<ButtonIcon
				disabled={!locationVisible}
				iconName="eye"
			/>
		) : (
			<ButtonIcon
				disabled={!locationVisible}
				iconName="eye-slash"
			/>
		)}
	</TouchableOpacity>
);

export default LocationVisibleButton;
