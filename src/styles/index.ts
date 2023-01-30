import { StyleSheet, Dimensions } from "react-native";

import { statusBarHeight } from "../constants";
import theme from "./theme";

const navigatorTabHeight = 70;

const Styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		backgroundColor: theme.colors.screenBackgroundColor,
		alignItems: "center",
	},
	screenContainer: {
		width: "95%",
		height: Dimensions.get("window").height - navigatorTabHeight,
		paddingHorizontal: 10,
		marginTop: statusBarHeight,
	},
	mapView: {
		flex: 1,
		width: Dimensions.get("window").width,
		height: Dimensions.get("window").height,
		marginTop: statusBarHeight,
	},
	smallMapViewContainer: {
		width: "95%",
		height: "74%",
		backgroundColor: theme.colors.primaryBackgroundColor,
		borderRadius: 9,
		padding: 4,
		margin: 10,
	},
	smallMapView: {
		width: "100%",
		height: "100%",
		borderRadius: 5,
		backgroundColor: "lightgrey",
	},
	hideLogo: {
		backgroundColor: theme.colors.primaryBackgroundColor,
		width: "100%",
		height: "7%",
		bottom: "7%",
	},
	routeButtonContainer: {
		flexDirection: "row",
		position: "absolute",
		alignSelf: "center",
		margin: 10,
		bottom: navigatorTabHeight,
		backgroundColor: theme.colors.primaryBackgroundColor,
		borderRadius: 9,
		paddingHorizontal: 2,
		paddingVertical: 4,
	},
	routeButton: {
		backgroundColor: theme.colors.buttonBackgroundColor,
		borderRadius: 5,
		justifyContent: "center",
		alignItems: "center",
		height: 50,
		width: 90,
		marginHorizontal: 2,
	},
	coordinateContainer: {
		flexDirection: "row",
		position: "absolute",
		alignSelf: "flex-start",
		marginVertical: 18,
		marginHorizontal: 18,
		top: statusBarHeight,
		backgroundColor: theme.colors.primaryBackgroundColor,
		borderRadius: 9,
		paddingHorizontal: 2,
		paddingVertical: 4,
	},
	coordinateItems: {
		backgroundColor: theme.colors.buttonBackgroundColor,
		borderRadius: 5,
		justifyContent: "center",
		alignItems: "center",
		height: 20,
		width: 145,
		marginHorizontal: 2,
		fontSize: theme.fontSizes.default,
		color: theme.colors.textPrimary,
		textAlign: "center",
		fontWeight: "bold",
	},
	navigatorTab: {
		flexDirection: "row",
		height: navigatorTabHeight,
		width: "100%",
		position: "absolute",
		justifyContent: "center",
		bottom: 0,
		backgroundColor: theme.colors.primaryBackgroundColor,
	},
	navigatorButton: {
		backgroundColor: theme.colors.buttonBackgroundColor,
		borderRadius: 5,
		padding: 1,
		width: 80,
		margin: 3,
	},
	inputContainer: {
		alignSelf: "center",
		flexDirection: "row",
		width: "95%",
		backgroundColor: theme.colors.primaryBackgroundColor,
		borderRadius: 9,
		padding: 4,
		marginBottom: 15,
		marginTop: 20,
	},
	inputField: {
		flex: 1,
		borderRadius: 5,
		height: 50,
		textAlign: "center",
		backgroundColor: "white",
		marginRight: 2,
	},
	headerContainer: {
		width: "100%",
		height: 40,
		justifyContent: "center",
		borderBottomColor: "lightgrey",
		borderBottomWidth: 1,
		marginBottom: 2,
	},
	navigatorIcon: {
		fontSize: 23,
		color: theme.colors.textPrimary,
		paddingTop: 5,
		textAlign: "center",
	},
	headerText: {
		fontSize: theme.fontSizes.header,
		color: theme.colors.textPrimary,
		alignContent: "center",
		alignSelf: "center",
	},
	navigatorText: {
		fontSize: theme.fontSizes.navi,
		fontWeight: "bold",
		color: theme.colors.textPrimary,
		paddingTop: 15,
		paddingBottom: 2,
		textAlign: "center",
	},
	buttonText: {
		fontSize: theme.fontSizes.default,
		fontWeight: "bold",
		color: theme.colors.textPrimary,
	},
	infoText: {
		fontSize: theme.fontSizes.info,
		color: theme.colors.textSecondary,
		textAlign: "center",
		paddingTop: 6,
	},
	defaultText: {
		fontSize: theme.fontSizes.default,
		color: theme.colors.textPrimary,
		paddingTop: 5,
		alignSelf: "flex-start",
	},
	initValueTextStyle: {
		width: 43,
		alignContent: "center",
	},
});

export default Styles;
