import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import NavigatorIcon from "./navigator-icon";

import theme from "../theme";

const styles = StyleSheet.create({
	navigatorTab: {
		display: "flex",
		flexDirection: "row",
		height: 85,
		position: "absolute",
		width: "100%",
		justifyContent: "center",
		alignItems: "flex-start",
		marginTop: 20,
		paddingTop: 5,
		bottom: 0,
		backgroundColor: theme.colors.primaryBackgroundColor,
	},
});

const NavigatorTab = () => {
	return (
		<View style={styles.navigatorTab}>
			<NavigatorIcon text="Map" />
			<NavigatorIcon text="Setting" />
		</View>
	);
};

export default NavigatorTab;
