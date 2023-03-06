import { View } from "react-native";

import MapViewContainer from "../components/map-view-container";
import RouteButtonContainer from "../components/route-button-container";
import CoordinateContainer from "../components/coordinate-container";
import TrackUserContainer from "../components/track-user-container";

const MapScreen = () => {
	return (
		<View>
			<MapViewContainer />
			<RouteButtonContainer />
			<TrackUserContainer />
			<CoordinateContainer />
		</View>
	);
};

export default MapScreen;
