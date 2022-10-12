import { StyleSheet } from "react-native";

const NaviTabStyles = StyleSheet.create({
	buttonStyle: {
		backgroundColor: "#b0c4de",
		borderRadius: 5,
		paddingTop: 1,
		paddingBottom: 1,
		paddingHorizontal: 15,
		textAlign: "center",
		height: "100%",
		width: 80,
		shadowColor: "black",
		shadowOffset: { width: 3, height: 1 },
		shadowOpacity: 0.8,
		shadowRadius: 10,
		elevation: 10,
		marginLeft: 3,
		marginRight: 3,
		flexDirection: "column",
	},
	iconStyle: {
		fontSize: 23,
		color: "dimgrey",
		paddingTop: 5,
		textAlign: "center",
	},
	textStyle: {
		fontSize: 11,
		fontWeight: "bold",
		color: "dimgrey",
		paddingTop: 15,
		paddingBottom: 2,
		paddingHorizontal: 0,
		textAlign: "center",
	},
});

export default NaviTabStyles;
