import { View } from "react-native";
import NavigatorButton from "./navigator-button";
import Styles from "../styles";

/**
 * Navigator tab located at the bottom of the screen which contains
 * navigator buttons to navigate into other views.
 */
const NavigatorTab = (): JSX.Element => {
	return (
		<View style={Styles.navigatorTab}>
			<NavigatorButton text="Map" iconName="map" path="/" />
			<NavigatorButton
				text="Find"
				iconName="location-arrow"
				path="/findroute"
			/>
			<NavigatorButton text="Settings" iconName="cog" path="/settings" />
		</View>
	);
};

export default NavigatorTab;
