import { View } from "react-native";

import MapViewContainer from "../components/MapViewContainer";
import RouteButtonContainer from "../components/MyRoutesMenu";
import CoordinateBar from "../components/CoordinateBar";
import TrackingMenu from "../components/TrackingMenu";

const MapScreen = () => {
	return (
		<View>
			<MapViewContainer />
			<RouteButtonContainer />
			<CoordinateBar />
			<TrackingMenu />
		</View>
	);
};

export default MapScreen;
