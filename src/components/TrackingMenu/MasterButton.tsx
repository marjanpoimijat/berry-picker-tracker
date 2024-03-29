import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import Styles from "../../styles";
import theme from "../../styles/theme";
import { MasterButtonProps } from "../../types";

/**
 * A master toggle button for the Tracking menu.
 *
 * @param {string} color [optiona] The color of the button.
 * @param {boolean} disabled [optional] Sets the button to a disabled (unclickable) state.
 * @param {function} handlePress A function to handle the button being pressed.
 * @param {string} iconName The name of the FontAwesome5 icon to be used in the button.
 * @param {string} text The text to be displayed in the button.
 * @param {boolean} toggled [optional] Button toggled status.
 * @returns {JSX.Element} A new MasterButton component.
 */
const MasterButton = ({ color, disabled, handlePress, iconName, text, toggled }: MasterButtonProps): JSX.Element => (
	<View style={Styles.masterButtonContainer}>
		<TouchableOpacity
			disabled={disabled}
			onPress={handlePress}
		>
			<Icon
				color={toggled ? theme.colors.buttonToggledColor : color ?? "black"}
				name={iconName}
				style={Styles.masterButtonIcon}
			/>
			<Text style={Styles.masterButtonText}>{text}</Text>
		</TouchableOpacity>
	</View>
);

export default MasterButton;
