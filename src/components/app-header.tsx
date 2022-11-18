import { Text, View, StyleSheet } from "react-native";
import { statusBarHeight } from "../constants";
import theme from "../theme";

const styles = StyleSheet.create({
	appHeader: {
		height: 50,
		position: "absolute",
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		top: statusBarHeight,
		backgroundColor: theme.colors.primaryBackgroundColor,
	},
	textHeader: {
		fontSize: theme.fontSizes.header,
		fontWeight: "bold",
		color: theme.colors.textSecondary,
	},
});

/**
 * Application header component which displays application name
 * and user ID on top of the screen. Just preliminary styling at the moment.
 * @param {string} name application name
 */
const AppHeader = ({
	name,
	userId,
}: {
	name: string;
	userId: string | null;
}): JSX.Element => {
	return (
		<View style={styles.appHeader}>
			<Text style={styles.textHeader}>{name}</Text>
			<Text
				style={{ color: "white" }}
			>{`User ID: ${userId} -${statusBarHeight}`}</Text>
		</View>
	);
};

export default AppHeader;
