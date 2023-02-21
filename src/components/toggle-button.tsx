import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useTypedSelector } from "../store";

import Styles from "../styles";
import theme from "../styles/theme";

interface Props {
	iconName: string;
	onPress: () => void;
	text: string;
}

const ToggleButton = ({ iconName, onPress, text }: Props): JSX.Element => {
	const toggled = useTypedSelector((state) => state.ui.routeButtonsVisible);
	const toggledColor = theme.colors.buttonToggledBackgroundColor;

	return (
		<View
			style={
				toggled
					? { ...Styles.navigatorButton, backgroundColor: toggledColor }
					: Styles.navigatorButton
			}
		>
			<TouchableOpacity onPress={onPress}>
				<Icon name={iconName} style={Styles.navigatorIcon} />
				<Text style={Styles.navigatorText}>{text}</Text>
			</TouchableOpacity>
		</View>
	);
};

export default ToggleButton;
