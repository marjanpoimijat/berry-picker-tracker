import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useTypedSelector } from "../store";
import Styles from "../styles";
import theme from "../styles/theme";
import { TrackingButtonProps } from "../types";

/**
 * A button for toggling the Tracking view.
 *
 * @param {string} iconName Name to be displayed on the button.
 * @param {function} onPress Function to handle the button being pressed.
 * @param {string} text Text to be displayed on the button.
 * @returns {JSX.Element} A new TrackingButton component.
 */
const TrackingButton = ({ iconName, onPress, text }: TrackingButtonProps): JSX.Element => {
	const toggled = useTypedSelector((state) => state.ui.trackListVisible);
	const toggledColor = theme.colors.buttonToggledBackgroundColor;

	return (
		<View style={toggled ? { ...Styles.navigatorButton, backgroundColor: toggledColor } : Styles.navigatorButton}>
			<TouchableOpacity onPress={onPress}>
				<Icon
					name={iconName}
					style={Styles.navigatorIcon}
				/>
				<Text style={Styles.navigatorText}>{text}</Text>
			</TouchableOpacity>
		</View>
	);
};

export default TrackingButton;
