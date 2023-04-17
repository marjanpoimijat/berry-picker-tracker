import { StyleSheet } from "react-native";

import theme from "./theme";

const navigatorTabHeight = 70;

const SettingsMenuStyles = StyleSheet.create({
	BlockText: {
		color: theme.colors.textPrimary,
		fontSize: theme.fontSizes.default,
		textAlign: "left",
	},
	GreySettingsMenuBlock: {
		backgroundColor: theme.colors.settingsMenuBackgroundColor,
		padding: 10,
	},
	GreySettingsMenuBlockBottomBorder: {
		alignItems: "center",
		backgroundColor: theme.colors.settingsMenuBackgroundColor,
		borderBottomColor: theme.colors.settingsMenuLineColor,
		borderBottomWidth: 0.5,
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 1,
		padding: 10,
	},
	SettingsMenuBlockTopBorder: {
		alignItems: "center",
		backgroundColor: theme.colors.screenBackgroundColor,
		borderBottomColor: theme.colors.settingsMenuLineColor,
		borderBottomWidth: 0.5,
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 1,
		padding: 3,
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
		color: theme.colors.textPrimary,
		fontSize: theme.fontSizes.header,
	},

	SettingsMenuTitleBlock: {
		alignItems: "center",
		borderBottomColor: theme.colors.settingsMenuLineColor,
		borderBottomWidth: 1.4,
		marginBottom: 1,
		padding: 5,
	},
	UserInformation: {
		color: "dimgrey",
		fontSize: 12,
		height: 40,
		textAlign: "right",
		textAlignVertical: "center",
	},
	WhiteSettingsMenuBlock: {
		alignItems: "center",
		backgroundColor: theme.colors.screenBackgroundColor,
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 3,
	},
	WhiteSettingsMenuBlockBottomBorder: {
		alignItems: "center",
		backgroundColor: theme.colors.screenBackgroundColor,
		borderBottomColor: theme.colors.settingsMenuLineColor,
		borderBottomWidth: 0.5,
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 1,
		padding: 3,
	},
});

export default SettingsMenuStyles;
