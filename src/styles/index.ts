import { StyleSheet, Dimensions } from "react-native";

import { statusBarHeight } from "../constants";
import theme from "./theme";

const navigatorTabHeight = 70;

const Styles = StyleSheet.create({
	buttonText: {
		color: theme.colors.textPrimary,
		fontSize: theme.fontSizes.default,
		fontWeight: "bold",
	},
	coordinateBox: {
		backgroundColor: "#fff",
		borderRadius: 10,
		padding: 7,
		position: "relative",
	},
	coordinateBoxContainer: {
		alignItems: "center",
		backgroundColor: theme.colors.primaryBackgroundColor,
		borderRadius: 10,
		padding: 2.5,
	},
	coordinateContainer: {
		alignSelf: "center",
		backgroundColor: theme.colors.primaryBackgroundColor,
		borderRadius: 9,
		flexDirection: "row",
		marginVertical: 12,
		paddingHorizontal: 2,
		paddingVertical: 4,
		position: "absolute",
		top: statusBarHeight,
	},
	coordinateDot: {
		backgroundColor: "red",
		borderColor: "black",
		borderRadius: 5,
		borderWidth: 1,
		height: 7,
		width: 7,
	},
	coordinateItems: {
		alignItems: "center",
		backgroundColor: theme.colors.buttonBackgroundColor,
		borderRadius: 5,
		color: theme.colors.textPrimary,
		fontSize: theme.fontSizes.default,
		fontWeight: "bold",
		height: 20,
		justifyContent: "center",
		marginHorizontal: 2,
		textAlign: "center",
		width: 110,
	},
	defaultText: {
		alignSelf: "flex-start",
		color: theme.colors.textPrimary,
		fontSize: theme.fontSizes.default,
		paddingTop: 5,
	},
	findButton: {
		alignItems: "center",
		backgroundColor: theme.colors.buttonBackgroundColor,
		borderRadius: 5,
		height: 50,
		justifyContent: "center",
		marginHorizontal: 2,
		width: 90,
	},
	headerContainer: {
		borderBottomColor: "lightgrey",
		borderBottomWidth: 1,
		height: 40,
		justifyContent: "center",
		marginBottom: 2,
		width: "100%",
	},
	headerText: {
		alignContent: "center",
		alignSelf: "center",
		color: theme.colors.textPrimary,
		fontSize: theme.fontSizes.header,
	},
	hideLogo: {
		backgroundColor: theme.colors.primaryBackgroundColor,
		bottom: "9%",
		height: "9%",
		width: "100%",
	},
	infoContainer: {
		alignSelf: "flex-start",
		backgroundColor: theme.colors.buttonBackgroundColor,
		borderRadius: 10,
		display: "flex",
		elevation: 10,
		margin: 15,
		padding: 10,
		position: "absolute",
		shadowColor: "black",
		shadowOffset: { height: 3, width: 3 },
		shadowOpacity: 0.8,
		shadowRadius: 20,
		top: statusBarHeight,
	},
	infoText: {
		color: theme.colors.textSecondary,
		fontSize: theme.fontSizes.info,
		paddingTop: 6,
		textAlign: "center",
	},
	initValueTextStyle: {
		alignContent: "center",
		width: 43,
	},
	inputContainer: {
		alignSelf: "center",
		backgroundColor: theme.colors.primaryBackgroundColor,
		borderRadius: 9,
		flexDirection: "row",
		marginBottom: 15,
		marginTop: 20,
		padding: 4,
		width: "95%",
	},
	inputField: {
		backgroundColor: "white",
		borderRadius: 5,
		flex: 1,
		height: 40,
		marginRight: 2,
		textAlign: "center",
	},
	mainContainer: {
		alignItems: "center",
		backgroundColor: theme.colors.screenBackgroundColor,
		flex: 1,
	},
	mapView: {
		flex: 1,
		height: Dimensions.get("window").height,
		marginTop: statusBarHeight,
		width: Dimensions.get("window").width,
	},
	navigatorButton: {
		backgroundColor: theme.colors.buttonBackgroundColor,
		border: "10px solid red",
		borderRadius: 5,
		margin: 3,
		padding: 1,
		width: 70,
	},
	navigatorIcon: {
		color: theme.colors.textPrimary,
		fontSize: 23,
		paddingTop: 5,
		textAlign: "center",
	},
	navigatorTab: {
		alignSelf: "center",
		backgroundColor: theme.colors.primaryBackgroundColor,
		borderRadius: 8,
		bottom: 12,
		flexDirection: "row",
		paddingHorizontal: 2,
		paddingVertical: 1.5,
		position: "absolute",
	},
	navigatorText: {
		color: theme.colors.textPrimary,
		fontSize: theme.fontSizes.navi,
		fontWeight: "bold",
		paddingBottom: 2,
		paddingTop: 15,
		textAlign: "center",
	},
	routeButton: {
		alignItems: "center",
		backgroundColor: theme.colors.buttonBackgroundColor,
		borderRadius: 5,
		height: 40,
		justifyContent: "center",
		marginHorizontal: 2,
		width: 90,
	},
	routeButtonContainer: {
		alignSelf: "center",
		backgroundColor: theme.colors.primaryBackgroundColor,
		borderRadius: 9,
		bottom: navigatorTabHeight + 10,
		display: "flex",
		flexDirection: "row",
		margin: 10,
		paddingHorizontal: 2,
		paddingVertical: 4,
		position: "absolute",
	},
	screenContainer: {
		height: Dimensions.get("window").height - navigatorTabHeight,
		marginTop: statusBarHeight,
		paddingHorizontal: 10,
		width: "95%",
	},
	shareButton: {
		alignItems: "center",
		backgroundColor: theme.colors.buttonBackgroundColor,
		borderRadius: 5,
		height: 40,
		justifyContent: "center",
		marginHorizontal: 2,
		width: 90,
	},
	smallMapView: {
		backgroundColor: "lightgrey",
		borderRadius: 5,
		height: "100%",
		width: "100%",
	},
	smallMapViewContainer: {
		backgroundColor: theme.colors.primaryBackgroundColor,
		borderRadius: 9,
		height: "74%",
		margin: 10,
		padding: 4,
		width: "95%",
	},
	textStyle: {
		color: "dimgrey",
		fontSize: 13,
		fontWeight: "bold",
	},
	trackUsersMenuContainer: {
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
	trackUsersMenuContent: {
		backgroundColor: theme.colors.buttonBackgroundColor,
		borderRadius: 9,
		height: "99%",
		padding: 10,
		position: "absolute",
		width: "97%",
	},
	trackUsersMenuTitle: {
		fontSize: 22,
	},
	trackedUserDetailsContainer: {
		//borderColor: "black",
		//borderWidth: 1,
		display: "flex",
		flexDirection: "row",
		padding: 10,
	},
	trackedUserDetailsDot: {
		backgroundColor: "red",
		//borderColor: 'black',
		borderRadius: 10,
		//borderWidth: 1,
		height: 13,
		width: 13,
	},
	trackedUserDetailsDotContainer: {
		//borderColor: "black",
		//borderWidth: 1,
		justifyContent: "center",
		padding: 5,
	},
	trackedUserDetailsUsername: {
		//borderColor: "black",
		//borderWidth: 1,
		fontSize: 18,
	},
});

export default Styles;
