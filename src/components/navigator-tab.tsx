import { View } from "react-native";
import MapButton from "./map-button";
import Styles from "../styles";

/**
 * Navigator tab located at the bottom of the screen which contains
 * navigator buttons to navigate into other views.
 */
const NavigatorTab = (): JSX.Element => {
	return (
		<View style={Styles.navigatorTab}>
			<MapButton text="Map" iconName="map" path="/" />
			<MapButton text="Find" iconName="location-arrow" path="/findroute" />
			<MapButton text="Settings" iconName="cog" path="/settings" />
		</View>
	);
};

export default NavigatorTab;
