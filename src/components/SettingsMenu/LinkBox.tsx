import { Text, TouchableOpacity, Linking } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import SettingsMenuStyles from "../../styles/SettingsMenuStyles";

interface Props {
	text: string;
	link: string;
}

export const LinkBox = ({ text, link }: Props): JSX.Element => {
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
export default LinkBox;
