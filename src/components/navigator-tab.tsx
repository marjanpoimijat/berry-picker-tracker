import { View } from "react-native";
import { connect } from "react-redux";

import { languages } from "../languages";
import { useTypedSelector } from "../store";
import Styles from "../styles";

import NavigatorButton from "./navigator-button";

/**
 * Navigator tab located at the bottom of the screen which contains
 * navigator buttons to navigate into other views.
 */
const NavigatorTab = (): JSX.Element => {
	const language = useTypedSelector((state) => state.language);

	return (
		<View style={Styles.navigatorTab}>
			<NavigatorButton
				text={languages["Map"][language]}
				iconName="map"
				path="/"
			/>
			<NavigatorButton
				text={languages["Find"][language]}
				iconName="location-arrow"
				path="/findroute"
			/>
			<NavigatorButton
				text={languages["Settings"][language]}
				iconName="cog"
				path="/settings"
			/>
		</View>
	);
};

const ConnectedNavigatorTab = connect()(NavigatorTab);
export default ConnectedNavigatorTab;
