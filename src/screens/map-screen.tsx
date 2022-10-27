import { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import * as Location from "expo-location";

import AppHeader from "../components/app-header";
import MapViewContainer from "../components/map-view-container";
import RouteButtonContainer from "../components/route-button-container";
import InfoContainer from "../components/info-container";
import NavigatorTab from "../components/navigator-tab";
import { useTypedSelector } from "../store";

const MapScreen = () => {
	const userId = useTypedSelector((state) => state.user.userId);

	/**
	 * Requests permissions to use device location.
	 * Gets device location and sets current location state if permissions is allowed.
	 * Otherwise sets error message state which is not currently used anywhere.
	 * Also gets cellular network operators MNC (Mobile Network Code), identifies user and sets user ID state.
	 * MNC code is a null if SIM card is not at the device or there is no cellular service available.
	 */
	useEffect(() => {
		(async () => {
			await Location.requestForegroundPermissionsAsync();
		})();
	}, []);

	return (
		<View style={styles.container}>
			<AppHeader name={"Berry picker tracker"} userId={userId} />
			<MapViewContainer />
			<RouteButtonContainer />
			<InfoContainer />
			<NavigatorTab />
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

export default MapScreen;
