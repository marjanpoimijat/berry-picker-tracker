import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const styles = StyleSheet.create({
	buttonStyle: {
		backgroundColor: "#b0c4de",
		borderRadius: 5,
		paddingTop: 1,
		paddingBottom: 1,
		paddingRight: 1,
		textAlign: "center",
		height: "100%",
		width: "25%",
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
		fontSize: 12,
		fontWeight: "bold",
		color: "dimgrey",
		paddingTop: 15,
		paddingBottom: 2,
		textAlign: "center",
	},
});

const CoffeeButton = ({ text }: { text: string }): JSX.Element => {
	return (
		<View style={styles.buttonStyle}>
			<TouchableOpacity>
				<Icon name="coffee" style={styles.iconStyle} />
				<Text style={styles.textStyle}>{text}</Text>
			</TouchableOpacity>
		</View>
	);
};

export default CoffeeButton;
