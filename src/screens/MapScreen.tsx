import { View } from "react-native";

import MapViewContainer from "../components/MapViewContainer";
import RouteButtonContainer from "../components/MyRoutesMenu";
import CoordinateContainer from "../components/CoordinateContainer";
import TrackingMenu from "../components/TrackingMenu";

const MapScreen = () => {
	return (
		<View>
			<MapViewContainer />
			<RouteButtonContainer />
			<CoordinateContainer />
			<TrackingMenu />
		</View>
	);
};

export default MapScreen;
