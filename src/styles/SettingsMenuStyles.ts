import { StyleSheet } from "react-native";

import theme from "./theme";

const navigatorTabHeight = 70;

const SettingsMenuStyles = StyleSheet.create({
	SettingsMenuContainer: {
		alignItems: "center",
		alignSelf: "center",
		backgroundColor: theme.colors.primaryBackgroundColor,
		borderRadius: 9,
		bottom: navigatorTabHeight + 10,
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		margin: 10,
		paddingHorizontal: 2,
		paddingVertical: 4,
		position: "absolute",
		top: 72,
		width: "90%",
	},
	SettingsMenuContent: {
		backgroundColor: theme.colors.buttonBackgroundColor,
		borderRadius: 9,
		height: "99%",
		padding: 10,
		position: "absolute",
		width: "97%",
	},
	SettingsMenuTitle: {
		fontSize: 22,
	},
});

export default SettingsMenuStyles;
