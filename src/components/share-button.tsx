import { Text, View } from "react-native";
import Styles from "../styles";

/**
 * Share button component which makes
 * possible for user to share route
 * @param {string} text Button text
 */
const ShareButton = ({ text }): JSX.Element => {
	return (
		<View style={Styles.shareButton}>
			<Text style={Styles.buttonText}>{text}</Text>
		</View>
	);
};

export default ShareButton;
