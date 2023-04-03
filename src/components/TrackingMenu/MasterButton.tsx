import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import Styles from "../../styles";
import { MasterButtonProps } from "../../types";

/**
 * A master toggle button for the Tracking menu.
 *
 * @param {MasterButtonProps} { handlePress, iconName, text }
 * @param {function} handlePress A function to handle the button being pressed.
 * @param {string} iconName The name of the FontAwesome5 icon to be used in the button.
 * @param {string} text The text to be displayed in the button.
 * @returns {JSX.Element} A new MasterButton component.
 */
const MasterButton = ({ handlePress, iconName, text }: MasterButtonProps): JSX.Element => (
	<View style={Styles.masterButtonContainer}>
		<TouchableOpacity onPress={handlePress}>
			<Icon
				name={iconName}
				style={Styles.masterButtonIcon}
			/>
			<Text style={Styles.masterButtonText}>{text}</Text>
		</TouchableOpacity>
	</View>
);

export default MasterButton;
