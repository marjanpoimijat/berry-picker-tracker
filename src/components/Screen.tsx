import { View } from "react-native";

import CoordinateBar from "./CoordinateBar";
import MapMenu from "./MapMenu";
import MapViewContainer from "./MapViewContainer";
import RouteButtonContainer from "./MyRoutesMenu";
import SettingsMenu from "./SettingsMenu";
import TrackingMenu from "./TrackingMenu";

const Screen = () => (
	<View>
		<MapViewContainer />
		<RouteButtonContainer />
		<CoordinateBar />
		<MapMenu />
		<TrackingMenu />
		<SettingsMenu />
	</View>
);

export default Screen;
