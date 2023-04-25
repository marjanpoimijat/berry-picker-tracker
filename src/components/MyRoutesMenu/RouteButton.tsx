import { Text, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { RouteButtonProps } from "../../types";
import Styles from "../../styles";

/**
 * Route button component which can perform on press functions such as toggle visibility on / off.
 *
 * @param {string} iconName The name of the FontAwesome5 icon to be displayed in the button.
 * @param {function} onPress A function to handle the button being pressed.
 * @param {string} text Text to be displayed on the butotn.
 * @returns {JSX.Element} A new RouteButton component.
 */
const RouteButton = ({ iconName, onPress, text }: RouteButtonProps): JSX.Element => (
	<View style={Styles.routeButton}>
		<TouchableOpacity onPress={onPress}>
			<Icon
				name={iconName}
				style={Styles.routeButtonIcon}
			/>
			<Text style={Styles.buttonText}>{text}</Text>
		</TouchableOpacity>
	</View>
);

export default RouteButton;
