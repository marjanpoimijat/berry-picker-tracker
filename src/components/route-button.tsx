import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

import theme from "../theme";

const styles = StyleSheet.create({
	buttonIcon: {
		backgroundColor: theme.colors.buttonBackgroundColor,
		borderRadius: 20,
		padding: 15,
		textAlign: "center",
		height: 50,
		shadowColor: "black",
		shadowOffset: { width: 3, height: 3 },
		shadowOpacity: 0.8,
		shadowRadius: 20,
		elevation: 5,
		margin: 5,
	},
});

interface Props {
	/** On press function */
	onPress: () => void;
	/** Button text */
	text: string;
}

/**
 * Route button component which can perform on press functions
 * such as toggle visibility on / off.
 * Just preliminary styling and location on a screen.
 * @param {string} text Button text
 * @returns a tree of React elements
 */
const RouteButton = ({ onPress, text }: Props): JSX.Element => {
	return (
		<View style={styles.buttonIcon}>
			<TouchableOpacity onPress={onPress}>
				<Text style={{ fontWeight: "bold" }}>{text}</Text>
			</TouchableOpacity>
		</View>
	);
};

export default RouteButton;
