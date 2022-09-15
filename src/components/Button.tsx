import { Text, View, Pressable, StyleSheet } from "react-native";

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
	onPress: () => void;
	text: string;
}

const Button = ({ onPress, text }: Props): JSX.Element => {
	return (
		<View style={styles.buttonIcon}>
			<Pressable onPress={onPress}>
				<Text style={{ fontWeight: "bold" }}>{text}</Text>
			</Pressable>
		</View>
	);
};

export default Button;
