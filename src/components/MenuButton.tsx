import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import Styles from "../styles";
import theme from "../styles/theme";
import { MenuButtonProps } from "../types";

const MenuButton = ({ iconName, onPress, routeActive, text, visible }: MenuButtonProps): JSX.Element => {
	const recordingColor = theme.colors.recordingColor;
	const toggledColor = theme.colors.buttonToggledBackgroundColor;

	return (
		<View style={visible ? { ...Styles.navigatorButton, backgroundColor: toggledColor } : Styles.navigatorButton}>
			<TouchableOpacity onPress={onPress}>
				<Icon
					name={iconName}
					style={routeActive ? { ...Styles.navigatorIcon, color: recordingColor } : Styles.navigatorIcon}
				/>
				<Text style={Styles.navigatorText}>{text}</Text>
			</TouchableOpacity>
		</View>
	);
};

export default MenuButton;
