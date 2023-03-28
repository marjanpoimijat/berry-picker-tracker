import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import Styles from "../styles";
import theme from "../styles/theme";
import { MenuButtonProps } from "../types";

/**
 * A generic menu button used in the navigator tab.
 * Tapping the button will open a new menu on top of the Map view.
 *
 * @param {string} iconName The name of the FontAwesome5 icon to be displayed in the button.
 * @param {function} onPress The onPress function to handle the button being pressed.
 * @param {boolean} routeActive Optional parameter used by the MyRoutes button when a route is being recorded.
 * @param {string} text The text to be displayed on the button.
 * @param {boolean} visible The visibility of the menu.
 * @returns {JSX.Element} A new MenuButton component.
 */
const MenuButton = ({ iconName, onPress, routeActive, text, visible }: MenuButtonProps): JSX.Element => {
	const recordingColor = theme.colors.recordingColor;
	const toggledColor = theme.colors.buttonToggledBackgroundColor;

	return (
		<View style={visible ? { ...Styles.navigatorButton, backgroundColor: toggledColor } : Styles.navigatorButton}>
			<TouchableOpacity onPress={onPress}>
				<Icon
					name={iconName}
					style={routeActive ? { ...Styles.navigatorIcon, color: recordingColor } : Styles.navigatorIcon}
				/>
				<Text style={Styles.navigatorText}>{text}</Text>
			</TouchableOpacity>
		</View>
	);
};

export default MenuButton;
