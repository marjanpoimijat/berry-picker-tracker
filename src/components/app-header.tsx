import { Text, View } from "react-native";
import Styles from "../styles";

/**
 * Application header to display header text at find-user-route-screen and settings-screen.
 * @param {string} name header text
 */
const AppHeader = ({ text }: { text: string }): JSX.Element => {
	return (
		<View style={Styles.headerContainer}>
			<Text style={Styles.headerText}>{text}</Text>
		</View>
	);
};

export default AppHeader;
