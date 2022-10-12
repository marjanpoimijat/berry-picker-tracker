import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Link } from "react-router-native";

const styles = StyleSheet.create({
	buttonStyle: {
		backgroundColor: "#b0c4de",
		borderRadius: 5,
		paddingTop: 1,
		paddingBottom: 1,
		paddingRight: 1,
		textAlign: "center",
		height: "100%",
		width: "100%",
		shadowColor: "black",
		shadowOffset: { width: 3, height: 1 },
		shadowOpacity: 0.8,
		shadowRadius: 10,
		elevation: 10,
		marginLeft: 10,
		marginRight: 10,
		flexDirection: "column",
	},
	iconStyle: {
		fontSize: 23,
		color: "dimgrey",
		paddingTop: 5,
		textAlign: "center",
	},
	textStyle: {
		fontSize: 12,
		fontWeight: "bold",
		color: "dimgrey",
		paddingTop: 15,
		paddingBottom: 2,
		textAlign: "center",
	},
});

const SettingsButton = ({ text }: { text: string }): JSX.Element => {
	return (
		<Link to="/settings">
			<View style={styles.buttonStyle}>
				<Icon name="cog" style={styles.iconStyle} />
				<Text style={styles.textStyle}>{text}</Text>
			</View>
		</Link>
	);
};

export default SettingsButton;
