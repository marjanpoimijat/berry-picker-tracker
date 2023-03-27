import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Link } from "react-router-native";
import Styles from "../styles";
import theme from "../styles/theme";
import { NavigatorButtonProps } from "../types";

/**
 * A button used for navigating between various screens.
 *
 * @param {string} iconName The name of the FontAwesome5 icon to be displayed in the button.
 * @param {string} path The path where pressing the button should lead to.
 * @param {string} text The text to be displayed in the button below the icon.
 * @returns {JSX.Element} A new NavigatorButton component.
 */
const NavigatorButton = ({ iconName, path, text }: NavigatorButtonProps): JSX.Element => (
	<Link
		to={path}
		underlayColor={theme.colors.buttonUnderlayColor}
	>
		<View style={Styles.navigatorButton}>
			<Icon
				name={iconName}
				style={Styles.navigatorIcon}
			/>
			<Text style={Styles.navigatorText}>{text}</Text>
		</View>
	</Link>
);

export default NavigatorButton;
