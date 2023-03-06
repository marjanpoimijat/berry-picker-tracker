import { View } from "react-native";

import MapViewContainer from "../components/map-view-container";
import RouteButtonContainer from "../components/route-button-container";
import CoordinateContainer from "../components/coordinate-container";
import TrackUserMenu from "../components/track-user-menu";

const MapScreen = () => {
	return (
		<View>
			<MapViewContainer />
			<RouteButtonContainer />
			<CoordinateContainer />
			<TrackUserMenu />
		</View>
	);
};

export default MapScreen;
