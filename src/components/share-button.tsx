import { Text, View, TouchableOpacity } from "react-native";
import { ShareButtonProps } from "../types";
import Styles from "../styles";

/**
 * Share button component which makes it possible for a user to share their route.
 *
 * @param {function} onPress Function to handle the button being pressed.
 * @param {string} text Text to be displayed on the button.
 * @returns {JSX.Element} A new ShareButton component.
 */
const ShareButton = ({ onPress, text }: ShareButtonProps): JSX.Element => (
	<View style={Styles.shareButton}>
		<TouchableOpacity onPress={onPress}>
			<Text style={Styles.buttonText}>{text}</Text>
		</TouchableOpacity>
	</View>
);

export default ShareButton;
