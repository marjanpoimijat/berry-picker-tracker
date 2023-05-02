import { View } from "react-native";

import CoordinateBar from "./CoordinateBar";
import MapMenu from "./MapMenu";
import MapViewContainer from "./MapViewContainer";
import RouteButtonContainer from "./MyRoutesMenu";
import SettingsMenu from "./SettingsMenu";
import TrackingMenu from "./TrackingMenu";

/**
 * The main screen of the application, contains all other menus
 * and subcomponents.
 *
 * @returns {JSX.Element} A new Screen component.
 */
const Screen = (): JSX.Element => (
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
