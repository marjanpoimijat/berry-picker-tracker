import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { ToggleButtonProps } from "../types";
import { useTypedSelector } from "../store";

import Styles from "../styles";
import theme from "../styles/theme";

const ToggleButton = ({
	iconName,
	onPress,
	text,
}: ToggleButtonProps): JSX.Element => {
	const active = useTypedSelector((state) => state.route.active);
	const toggled = useTypedSelector((state) => state.ui.routeButtonsVisible);
	const recordingColor = theme.colors.recordingColor;
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
				<Icon
					name={iconName}
					style={
						active
							? { ...Styles.navigatorIcon, color: recordingColor }
							: Styles.navigatorIcon
					}
				/>
				<Text style={Styles.navigatorText}>{text}</Text>
			</TouchableOpacity>
		</View>
	);
};

export default ToggleButton;
