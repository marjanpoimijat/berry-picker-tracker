import { View, StyleSheet } from "react-native";
import { Navigate, Route, Routes } from "react-router-native";
import MapScreen from "../screens/map-screen";
import SettingsScreen from "../screens/settings-screen";
import CoffeeScreen from "../screens/coffee-screen";

import NavigatorTab from "./navigator-tab";

const Main = () => {
	return (
		<View style={styles.container}>
			<NavigatorTab />
			<Routes>
				<Route path="/" element={<MapScreen />} />
				<Route path="/settings" element={<SettingsScreen />} />
				<Route path="/coffee" element={<CoffeeScreen />} />
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "flex-start",
		flexDirection: "column",
	},
});

export default Main;
