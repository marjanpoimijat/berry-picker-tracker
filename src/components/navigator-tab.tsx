import { View, StyleSheet } from "react-native";
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

/**
 * Navigator tab located at the bottom of the screen which contains
 * navigator icons to navigate into other views.
 * Just preliminary styling at the moment.
 * @returns a tree of React elements
 */
const NavigatorTab = (): JSX.Element => {
	return (
		<View style={styles.navigatorTab}>
			<NavigatorIcon text="Map" />
			<NavigatorIcon text="Setting" />
		</View>
	);
};

export default NavigatorTab;
