import { Text, View } from "react-native";
import Styles from "../styles";
import { AppHeaderProps } from "../types";

/**
 * Displays a header text at the top of a component.
 *
 * @param {string} text The text to be displayed in the header.
 * @returns {JSX.Element} A new AppHeader component.
 */
const AppHeader = ({ text }: AppHeaderProps): JSX.Element => (
	<View style={Styles.headerContainer}>
		<Text style={Styles.headerText}>{text}</Text>
	</View>
);

export default AppHeader;
