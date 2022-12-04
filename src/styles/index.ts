import { StyleSheet } from "react-native";
import theme from "./theme";

const Styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		backgroundColor: theme.colors.screenBackgroundColor,
		alignItems: "center",
	},
	navigatorTab: {
		flexDirection: "row",
		height: 70,
		width: "100%",
		position: "absolute",
		justifyContent: "center",
		alignItems: "center",
		bottom: 0,
		backgroundColor: theme.colors.navigatorBackgroundColor,
	},
	navigatorButton: {
		backgroundColor: theme.colors.buttonBackgroundColor,
		borderRadius: 5,
		padding: 1,
		width: 80,
		margin: 3,
	},
	iconStyle: {
		fontSize: 23,
		color: theme.colors.textPrimary,
		paddingTop: 5,
		textAlign: "center",
	},
	textStyle: {
		fontSize: 11,
		fontWeight: "bold",
		color: theme.colors.textPrimary,
		paddingTop: 15,
		paddingBottom: 2,
		textAlign: "center",
	},
});

export default Styles;
