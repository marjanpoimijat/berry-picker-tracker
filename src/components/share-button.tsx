import { Text, View, TouchableOpacity } from "react-native";
import Styles from "../styles";

interface Props {
	/** On press function */
	onPress: () => void;
	/** Button text */
	text: string;
}
/**
 * Share button component which makes
 * possible for user to share route
 * @param {string} text Button text
 */
const ShareButton = ({ onPress, text }: Props): JSX.Element => {
	return (
		<View style={Styles.shareButton}>
			<TouchableOpacity onPress={onPress}>
				<Text style={Styles.buttonText}>{text}</Text>
			</TouchableOpacity>
		</View>
	);
};

export default ShareButton;
