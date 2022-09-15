import { View, Pressable, StyleSheet } from "react-native";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
	navigatorIcon: {
		backgroundColor: theme.colors.primaryBackgroundColor,
		borderRadius: 20,
		borderColor: "black",
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

const NavigatorTab = ({ text }: { text: string }) => {
	return (
		<View style={styles.navigatorIcon}>
			<Pressable>
				<Text fontSize="header" fontWeight="bold" color="textSecondary">
					{text}
				</Text>
			</Pressable>
		</View>
	);
};

export default NavigatorTab;
