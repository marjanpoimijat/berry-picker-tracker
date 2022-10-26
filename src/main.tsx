import { View, StyleSheet } from "react-native";
import { Navigate, Route, Routes } from "react-router-native";
import { useEffect } from "react";

import { useTypedDispatch, useTypedSelector } from "./store";
import { identifyUser } from "./reducers/user-reducer";
import { storeWaypoint } from "./reducers/waypoint-reducer";
import MapScreen from "./screens/map-screen";
import SettingsScreen from "./screens/settings-screen";
import CoffeeScreen from "./screens/coffee-screen";
import NavigatorTab from "./components/navigator-tab";

const Main = () => {
	const userId: string | null = useTypedSelector((state) => state.user);
	const routeInfo = useTypedSelector((state) => state.route);
	const trackingInterval = 2500; //to be changed
	const dispatch = useTypedDispatch();

	useEffect(() => {
		dispatch(identifyUser(userId));
	}, [dispatch]);

	useEffect(() => {
		function tick() {
			dispatch(storeWaypoint(routeInfo.routeId));
		}
		if (routeInfo.active) {
			const interval = setInterval(tick, trackingInterval);
			return () => clearInterval(interval);
		}
	}, [routeInfo]);

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
