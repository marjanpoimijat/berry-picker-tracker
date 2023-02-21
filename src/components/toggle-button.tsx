import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

import Styles from "../styles";

interface Props {
	iconName: string;
	onPress: () => void;
	text: string;
}

const ToggleButton = ({ iconName, onPress, text }: Props): JSX.Element => {
	return (
		<View style={Styles.navigatorButton}>
			<TouchableOpacity onPress={onPress}>
				<Icon name={iconName} style={Styles.navigatorIcon} />
				<Text style={Styles.navigatorText}>{text}</Text>
			</TouchableOpacity>
		</View>
	);
};

export default ToggleButton;
