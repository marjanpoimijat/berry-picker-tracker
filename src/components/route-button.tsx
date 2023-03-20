import { Text, View, TouchableOpacity } from "react-native";
import { RouteButtonProps } from "../types";
import Styles from "../styles";

/**
 * Route button component which can perform on press functions
 * such as toggle visibility on / off.
 * Just preliminary styling and location on a screen.
 * @param {string} text Button text
 */
const RouteButton = ({ onPress, text }: RouteButtonProps): JSX.Element => {
	return (
		<View style={Styles.routeButton}>
			<TouchableOpacity onPress={onPress}>
				<Text style={Styles.buttonText}>{text}</Text>
			</TouchableOpacity>
		</View>
	);
};

export default RouteButton;
