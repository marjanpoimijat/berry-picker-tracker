import { Text, View } from "react-native";
import { AppHeaderProps } from "../../types";
import Styles from "../styles";

/**
 * Application header to display header text at find-user-route-screen and settings-screen.
 * @param {string} name header text
 */
const AppHeader = ({ text }: AppHeaderProps): JSX.Element => {
	return (
		<View style={Styles.headerContainer}>
			<Text style={Styles.headerText}>{text}</Text>
		</View>
	);
};

export default AppHeader;
