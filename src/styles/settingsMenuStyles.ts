import { StyleSheet } from "react-native";

import theme from "./theme";

const navigatorTabHeight = 70;

const settingsMenuStyles = StyleSheet.create({
	attentionText: {
		color: theme.colors.attentionColor,
		fontSize: theme.fontSizes.default,
		textAlign: "left",
	},
	blockText: {
		color: theme.colors.textPrimary,
		fontSize: theme.fontSizes.default,
		textAlign: "left",
	},
	greySettingsMenuBlock: {
		backgroundColor: theme.colors.settingsMenuBackgroundColor,
		padding: 10,
	},
	greySettingsMenuBlockBottomBorder: {
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
	settingsMenuContainer: {
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
	settingsMenuContent: {
		backgroundColor: theme.colors.buttonBackgroundColor,
		borderRadius: 9,
		height: "99%",
		padding: 10,
		position: "absolute",
		width: "97%",
	},
	settingsMenuTitle: {
		color: theme.colors.textPrimary,
		fontSize: theme.fontSizes.header,
	},
	settingsMenuTitleBlock: {
		alignItems: "center",
		borderBottomColor: theme.colors.settingsMenuLineColor,
		borderBottomWidth: 1.4,
		marginBottom: 1,
		padding: 5,
	},
	userInformation: {
		color: "dimgrey",
		fontSize: 12,
		height: 40,
		textAlign: "right",
		textAlignVertical: "center",
	},
	whiteSettingsMenuBlock: {
		alignItems: "center",
		backgroundColor: theme.colors.screenBackgroundColor,
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 3,
	},
	whiteSettingsMenuBlockBottomBorder: {
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

export default settingsMenuStyles;
