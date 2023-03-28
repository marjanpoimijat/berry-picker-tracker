import { View } from "react-native";

import MapViewContainer from "../components/MapViewContainer";
import RouteButtonContainer from "../components/MyRoutesMenu";
import CoordinateBar from "../components/CoordinateBar";
import TrackingMenu from "../components/TrackingMenu";
import SettingsMenu from "../components/SettingsMenu";

const MapScreen = () => {
	return (
		<View>
			<MapViewContainer />
			<RouteButtonContainer />
			<CoordinateBar />
			<TrackingMenu />
			<SettingsMenu />
		</View>
	);
};

export default MapScreen;
