import { View } from "react-native";
import { connect } from "react-redux";
import NavigatorButton from "./navigator-button";
import Styles from "../styles";
import { Language } from "../types";
import { languages } from "../languages";
import { useTypedSelector } from "../store";

/**
 * Navigator tab located at the bottom of the screen which contains
 * navigator buttons to navigate into other views.
 */
const NavigatorTab = (): JSX.Element => {
	const language = useTypedSelector((state) => state.language);

	return (
		<View style={Styles.navigatorTab}>
			<NavigatorButton
				text={
					languages["Map"][
						language.language === 0 ? Language.English : Language.Finnish
					]
				}
				iconName="map"
				path="/"
			/>
			<NavigatorButton
				text="Find"
				iconName="location-arrow"
				path="/findroute"
			/>
			<NavigatorButton text="Settings" iconName="cog" path="/settings" />
		</View>
	);
};

const ConnectedNavigatorTab = connect()(NavigatorTab);
export default ConnectedNavigatorTab;
