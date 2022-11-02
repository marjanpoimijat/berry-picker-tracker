import { View, StyleSheet } from "react-native";
import { Navigate, Route, Routes } from "react-router-native";
import { useEffect } from "react";

import { useTypedDispatch, useTypedSelector } from "./store";
import { identifyUser } from "./reducers/user-reducer";
import {
	storeWaypoint,
	sendPendingWaypoints,
} from "./reducers/waypoint-reducer";
import MapScreen from "./screens/map-screen";
import SettingsScreen from "./screens/settings-screen";
import CoffeeScreen from "./screens/coffee-screen";
import NavigatorTab from "./components/navigator-tab";
import useInterval from "./hooks/use-interval";

const Main = () => {
	const user = useTypedSelector((state) => state.user);
	const routeInfo = useTypedSelector((state) => state.route);
	const waypoints = useTypedSelector((state) => state.waypoints);
	const dispatch = useTypedDispatch();

	useEffect(() => {
		dispatch(identifyUser(user.userId));
	}, [dispatch]);

	useInterval(() => {
		if (routeInfo.active) {
			dispatch(storeWaypoint(routeInfo.routeId));
		}
	}, user.trackingInterval);

	useInterval(() => {
		if (routeInfo.active) {
			dispatch(sendPendingWaypoints(waypoints.pendingWaypoints));
		}
	}, user.sendingInterval);

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
