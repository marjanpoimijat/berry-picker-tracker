import { Text, View, TouchableOpacity } from "react-native";
import { RouteButtonProps } from "../../types";
import Styles from "../../styles";

/**
 * Route button component which can perform on press functions such as toggle visibility on / off.
 *
 * @param {function} onPress A function to handle the button being pressed.
 * @param {string} text Text to be displayed on the butotn.
 * @returns {JSX.Element} A new RouteButton component.
 */
const RouteButton = ({ onPress, text }: RouteButtonProps): JSX.Element => (
	<View style={Styles.routeButton}>
		<TouchableOpacity onPress={onPress}>
			<Text style={Styles.buttonText}>{text}</Text>
		</TouchableOpacity>
	</View>
);

export default RouteButton;
