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
				iconName="route"
				path="/"
				text={languages["Routes"][language]}
			/>
			<NavigatorButton
				iconName="map"
				path="/"
				text={languages["Map"][language]}
			/>
			<NavigatorButton
				iconName="location-arrow"
				path="/findroute"
				text={languages["Find"][language]}
			/>
			<NavigatorButton
				iconName="cog"
				path="/settings"
				text={languages["Settings"][language]}
			/>
		</View>
	);
};

const ConnectedNavigatorTab = connect()(NavigatorTab);
export default ConnectedNavigatorTab;
