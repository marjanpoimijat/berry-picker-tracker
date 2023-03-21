import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { TrackingButtonProps } from "../types";
import { useTypedSelector } from "../store";

import Styles from "../styles";
import theme from "../styles/theme";

const TrackingButton = ({ iconName, onPress, text }: TrackingButtonProps): JSX.Element => {
	const toggled = useTypedSelector((state) => state.ui.trackListVisible);
	const toggledColor = theme.colors.buttonToggledBackgroundColor;

	return (
		<View style={toggled ? { ...Styles.navigatorButton, backgroundColor: toggledColor } : Styles.navigatorButton}>
			<TouchableOpacity onPress={onPress}>
				<Icon
					name={iconName}
					style={Styles.navigatorIcon}
				/>
				<Text style={Styles.navigatorText}>{text}</Text>
			</TouchableOpacity>
		</View>
	);
};

export default TrackingButton;
