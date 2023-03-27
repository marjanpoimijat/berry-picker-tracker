import { View } from "react-native";

import MapViewContainer from "../components/MapViewContainer";
import RouteButtonContainer from "../components/RouteButtonContainer";
import CoordinateContainer from "../components/CoordinateContainer";
import TrackUserMenu from "../components/TrackUserMenu";

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
