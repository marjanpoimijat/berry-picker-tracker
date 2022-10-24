import { Text, View, StyleSheet } from "react-native";
import SettingsToggle from "../components/settings-toggle";
import theme from "../theme";

/** Primitive Settings Screen implementation
 * Light colored separator and hairline ruler to separate content
 * Primitive layout with flex
 */

const Ruler = () => <View style={styles.rulerStyle} />;
const Separator = () => <View style={styles.separatorStyle} />;

const SettingsScreen = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.screenHeadertext}>Settings</Text>
			<Separator />
			<Text style={styles.headerStyle}>TRACKING SETTINGS</Text>
			<Text style={styles.subheaderStyle}>Accuracy</Text>
			<Text style={styles.textStyle}>Set waypoint frequency</Text>
			<Text style={styles.subheaderStyle}>Enable Network Localization</Text>
			<View style={styles.toggleStyle}>
				<SettingsToggle />
			</View>
			<Ruler />
			<Text style={styles.headerStyle}>APP SETTINGS</Text>
			<Text style={styles.subheaderStyle}>App Theme</Text>
			<Text style={styles.textStyle}>Select Light or Dark Mode</Text>
			<View style={styles.toggleStyle}>
				<SettingsToggle />
			</View>
			<Ruler />
			<Text style={styles.headerStyle}>MORE SETTINGS</Text>
			<Text style={styles.subheaderStyle}>More...</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 0,
		width: "90%",
		height: "90%",
		alignItems: "flex-start",
		justifyContent: "center",
		flexDirection: "column",
	},
	subheaderStyle: {
		fontSize: 14,
		fontWeight: "bold",
		color: "dimgrey",
		paddingTop: 10,
		paddingBottom: 2,
		paddingLeft: 10,
		alignSelf: "flex-start",
	},
	headerStyle: {
		fontSize: 13,
		color: "dimgrey",
		paddingTop: 10,
		paddingBottom: 2,
		paddingHorizontal: 0,
		alignSelf: "flex-start",
	},
	textStyle: {
		fontSize: 13,
		color: "dimgrey",
		paddingTop: 5,
		paddingBottom: 0,
		paddingLeft: 20,
		alignSelf: "flex-start",
	},
	rulerStyle: {
		borderBottomColor: "dimgrey",
		borderBottomWidth: StyleSheet.hairlineWidth,
		alignSelf: "stretch",
		marginVertical: 8,
	},
	separatorStyle: {
		borderBottomColor: "#eaeff6",
		borderBottomWidth: 8,
		alignSelf: "stretch",
		marginBottom: 8,
	},
	toggleStyle: {
		alignSelf: "flex-end",
	},
	screenHeadertext: {
		fontSize: theme.fontSizes.header,
		fontWeight: "bold",
		color: "black",
		marginBottom: 20,
		paddingBottom: 8,
		paddingLeft: 10,
		alignSelf: "flex-start",
	},
});

export default SettingsScreen;
