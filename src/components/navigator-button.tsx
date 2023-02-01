import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Link } from "react-router-native";

import Styles from "../styles";
import theme from "../styles/theme";

interface Props {
	iconName: string;
	path: string;
	text: string;
}

const NavigatorButton = ({ iconName, path, text }: Props): JSX.Element => {
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
