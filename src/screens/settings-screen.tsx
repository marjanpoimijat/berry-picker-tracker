import { Text, View } from "react-native";
import NavigatorTab from "../components/navigator-tab";

const SettingsScreen = () => {
	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<Text>Settings</Text>
			<NavigatorTab />
		</View>
	);
};

export default SettingsScreen;
