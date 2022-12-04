import { View } from "react-native";

import MapViewContainer from "../components/map-view-container";
import RouteButtonContainer from "../components/route-button-container";
import InfoContainer from "../components/info-container";

const MapScreen = () => {
	return (
		<View>
			<MapViewContainer />
			<RouteButtonContainer />
			<InfoContainer />
		</View>
	);
};

export default MapScreen;
