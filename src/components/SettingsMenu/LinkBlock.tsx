import { Text, TouchableOpacity, Linking } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import settingsMenuStyles from "../../styles/settingsMenuStyles";
import { LinkBlockProps } from "../../types";

/**
 * A block that opens a link when pressed.
 *
 * @param {string} link The link which the component will open when clicked.
 * @param {string} text The text that explains what the link is.
 * @returns {JSX.Element} A new LinkBlock component.
 */
export const LinkBlock = ({ link, text }: LinkBlockProps): JSX.Element => (
	<TouchableOpacity
		onPress={() => Linking.openURL(link)}
		style={settingsMenuStyles.whiteSettingsMenuBlockBottomBorder}
	>
		<Text style={{ ...settingsMenuStyles.blockText, height: 40, textAlignVertical: "center" }}>{text}</Text>
		<Icon name="chevron-right" />
	</TouchableOpacity>
);

export default LinkBlock;
