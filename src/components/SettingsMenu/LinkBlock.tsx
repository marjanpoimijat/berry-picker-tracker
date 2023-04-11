import { Text, TouchableOpacity, Linking } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import SettingsMenuStyles from "../../styles/SettingsMenuStyles";

interface Props {
	text: string;
	link: string;
}
/**
 * Renders a linkblock that when pressed opens a link
 *
 * @param {string} text The text that explains what the link is
 * @param {string} link The link which the component will open when clicked
 * @returns {JSX.Element}  A new LinkBlock component
 */
export const LinkBlock = ({ text, link }: Props): JSX.Element => {
	return (
		<>
			<TouchableOpacity
				onPress={() => Linking.openURL(link)}
				style={SettingsMenuStyles.WhiteSettingsMenuBlockBottomBorder}
			>
				<Text style={{ ...SettingsMenuStyles.BlockText, height: 40, textAlignVertical: "center" }}>{text}</Text>
				<Icon name="chevron-right" />
			</TouchableOpacity>
		</>
	);
};
export default LinkBlock;
