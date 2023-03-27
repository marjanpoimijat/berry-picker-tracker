import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { ToggleButtonProps } from "../types";
import { useTypedSelector } from "../store";
import Styles from "../styles";
import theme from "../styles/theme";
/**
 * A toggleable button component.
 * @param {string} iconName Name of the FontAwesome5 icon to be displayed on the button.
 * @param {function} onPress Function to handle the button being pressed.
 * @param {string} text Text to be displayed on the button.
 * @returns {JSX.Element} A new ToggleButton component.
 */
const ToggleButton = ({ iconName, onPress, text }: ToggleButtonProps): JSX.Element => {
	const active = useTypedSelector((state) => state.route.active);
	const toggled = useTypedSelector((state) => state.ui.routeButtonsVisible);
	const recordingColor = theme.colors.recordingColor;
	const toggledColor = theme.colors.buttonToggledBackgroundColor;

	return (
		<View style={toggled ? { ...Styles.navigatorButton, backgroundColor: toggledColor } : Styles.navigatorButton}>
			<TouchableOpacity onPress={onPress}>
				<Icon
					name={iconName}
					style={active ? { ...Styles.navigatorIcon, color: recordingColor } : Styles.navigatorIcon}
				/>
				<Text style={Styles.navigatorText}>{text}</Text>
			</TouchableOpacity>
		</View>
	);
};

export default ToggleButton;
