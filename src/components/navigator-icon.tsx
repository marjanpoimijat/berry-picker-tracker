import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { Link } from "react-router-native";

import theme from "../theme";

const styles = StyleSheet.create({
	navigatorIcon: {
		backgroundColor: theme.colors.primaryBackgroundColor,
		borderRadius: 20,
		borderColor: "black",
		padding: 15,
		textAlign: "center",
		height: 50,
		shadowColor: "black",
		shadowOffset: { width: 3, height: 3 },
		shadowOpacity: 0.8,
		shadowRadius: 20,
		elevation: 5,
		margin: 5,
	},
	textStyle: {
		fontSize: theme.fontSizes.header,
		fontWeight: "bold",
		color: theme.colors.textSecondary,
	},
});

interface Props {
	/** Navigator icon text */
	text: string;
	/** Route name */
	route: string;
}

/**
 * Navigator icon component
 * @param param0
 * @returns
 */
const NavigatorIcon = ({ text, route }: Props): JSX.Element => {
	return (
		<View style={styles.navigatorIcon}>
			<Link to={route}>
				<Text style={styles.textStyle}>{text}</Text>
			</Link>
		</View>
	);
};

export default NavigatorIcon;
