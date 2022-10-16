import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

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

/**
 * Navigator icon component to indicate where to navigate.
 * Icons are not currently forwarding anywhere.
 * Just preliminary styling at the moment.
 * @param {string} text Navigator icon name
 * @returns a tree of React elements
 */
const NavigatorIcon = ({ text }: { text: string }): JSX.Element => {
	return (
		<View style={styles.navigatorIcon}>
			<TouchableOpacity>
				<Text style={styles.textStyle}>{text}</Text>
			</TouchableOpacity>
		</View>
	);
};

export default NavigatorIcon;