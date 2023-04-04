import { Text, View } from "react-native";
import Styles from "../../styles";
import { TitleProps } from "../../types";

/**
 * Displays a title at the top of a Menu.
 *
 * @param {string} text The text to be displayed as the title.
 * @returns {JSX.Element} A new Title component.
 */
const Title = ({ text }: TitleProps): JSX.Element => (
	<View style={{ alignItems: "center" }}>
		<Text style={Styles.trackedUsersListTitle}>{text}</Text>
	</View>
);

export default Title;
