import { View } from "react-native";
import { Navigate, Route, Routes } from "react-router-native";
import { useEffect } from "react";

import { useTypedDispatch } from "./store";
import { identifyUser } from "./reducers/user-reducer";
import MapScreen from "./screens/map-screen";
import SettingsScreen from "./screens/settings-screen";
import FindUserRouteScreen from "./screens/find-user-route-screen";
import NavigatorTab from "./components/navigator-tab";

import {
	defineBackgroundLocationTask,
	requestPermissions,
} from "./utils/location-tracking";
import { makeTileCacheDirectory } from "./utils/file-system";
import Styles from "./styles";

const Main = () => {
	const dispatch = useTypedDispatch();

	useEffect(() => {
		makeTileCacheDirectory();
		(async () => {
			defineBackgroundLocationTask(dispatch);
			await requestPermissions();
			await dispatch(identifyUser());
		})();
	}, [dispatch]);

	return (
		<View style={Styles.mainContainer}>
			<Routes>
				<Route path="/" element={<MapScreen />} />
				<Route path="/settings" element={<SettingsScreen />} />
				<Route path="/findroute" element={<FindUserRouteScreen />} />
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
			<NavigatorTab />
		</View>
	);
};

export default Main;
