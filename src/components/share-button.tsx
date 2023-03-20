import { Text, View, TouchableOpacity } from "react-native";
import { ShareButtonProps } from "../../types";
import Styles from "../styles";

/**
 * Share button component which makes
 * possible for user to share route
 * @param {string} text Button text
 */
const ShareButton = ({ onPress, text }: ShareButtonProps): JSX.Element => {
	return (
		<View style={Styles.shareButton}>
			<TouchableOpacity onPress={onPress}>
				<Text style={Styles.buttonText}>{text}</Text>
			</TouchableOpacity>
		</View>
	);
};

export default ShareButton;
