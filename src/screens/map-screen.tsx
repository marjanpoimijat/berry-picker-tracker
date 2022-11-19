import { View, StyleSheet } from "react-native";

import AppHeader from "../components/app-header";
import MapViewContainer from "../components/map-view-container";
import RouteButtonContainer from "../components/route-button-container";
import InfoContainer from "../components/info-container";
import NavigatorTab from "../components/navigator-tab";

const MapScreen = () => {
	return (
		<View style={styles.container}>
			<AppHeader name={"Berry picker tracker"} />
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
