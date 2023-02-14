import { Text, View } from "react-native";
import Styles from "../styles";

/**
 * Route button component which can perform on press functions
 * such as toggle visibility on / off.
 * Just preliminary styling and location on a screen.
 * @param {string} text Button text
 */
const ShareButton = (): JSX.Element => {
	return (
		<View style={Styles.shareButton}>
			<Text style={Styles.buttonText}>Share route</Text>
		</View>
	);
};

export default ShareButton;
