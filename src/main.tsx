import { View } from "react-native";
import { Navigate, Route, Routes } from "react-router-native";
import { useEffect } from "react";

import { useTypedDispatch } from "./store";
import { identifyUser } from "./reducers/user-reducer";
import MapScreen from "./screens/map-screen";
import SettingsScreen from "./screens/settings-screen";
import NavigatorTab from "./components/navigator-tab";

import {
	defineBackgroundLocationTask,
	requestPermissions,
} from "./utils/location-tracking";
import { makeTileCacheDirectory } from "./utils/file-system";
import Styles from "./styles";
import { addSharedUser } from "./track-user";

const Main = () => {
	addSharedUser();

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
				<Route element={<MapScreen />} path="/" />
				<Route element={<SettingsScreen />} path="/settings" />
				<Route element={<Navigate replace to="/" />} path="*" />
			</Routes>
			<NavigatorTab />
		</View>
	);
};

export default Main;
