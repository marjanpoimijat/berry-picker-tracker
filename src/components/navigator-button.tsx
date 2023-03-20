import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Link } from "react-router-native";

import Styles from "../styles";
import theme from "../styles/theme";

import { NavigatorButtonProps } from "../../types";

const NavigatorButton = ({
	iconName,
	path,
	text,
}: NavigatorButtonProps): JSX.Element => {
	return (
		<Link to={path} underlayColor={theme.colors.buttonUnderlayColor}>
			<View style={Styles.navigatorButton}>
				<Icon name={iconName} style={Styles.navigatorIcon} />
				<Text style={Styles.navigatorText}>{text}</Text>
			</View>
		</Link>
	);
};

export default NavigatorButton;
