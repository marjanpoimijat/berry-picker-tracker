import { StyleSheet } from "react-native";

import theme from "./theme";

const navigatorTabHeight = 70;

const SettingsMenuStyles = StyleSheet.create({
	BlockContainer: {
		backgroundColor: theme.colors.settingsMenuBackgroundColor,
		padding: 10,
	},
	BlockText: {
		fontSize: theme.fontSizes.default,
		textAlign: "left",
	},
	NavigationContainer: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 10,
	},
	SettingContainer: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 10,
	},
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
		fontSize: theme.fontSizes.header,
	},
	SettingsMenuTitleBlock: {
		alignItems: "center",
		borderBottomColor: theme.colors.settingsMenuTitleBorderColor,
		borderBottomWidth: 1.4,
		marginBottom: 1,
		padding: 5,
	},
});

export default SettingsMenuStyles;
