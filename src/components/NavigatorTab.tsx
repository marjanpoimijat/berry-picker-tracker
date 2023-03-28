import { View } from "react-native";
import { connect } from "react-redux";
import { languages } from "../languages";
import { setMyRoutesMenuVisible, setTrackingMenuVisible } from "../reducers/ui-reducer";
import { useTypedDispatch, useTypedSelector } from "../store";
import Styles from "../styles";
import MenuButton from "./MenuButton";
import NavigatorButton from "./NavigatorButton";

/**
 * Navigator tab located at the bottom of the screen which contains
 * navigator buttons to navigate into other views.
 *
 * @returns {JSX.Element} A new NavigatorTab component.
 */
const NavigatorTab = (): JSX.Element => {
	const language = useTypedSelector((state) => state.language);
	const visibleMyRoutesMenu = useTypedSelector((state) => state.ui.myRoutesMenuVisible);
	const visibleTrackingMenu = useTypedSelector((state) => state.ui.trackingMenuVisible);
	const routeActive = useTypedSelector((state) => state.route.active);
	const dispatch = useTypedDispatch();

	const toggleMyRoutesMenu = () => {
		dispatch(setMyRoutesMenuVisible(!visibleMyRoutesMenu));
	};

	const toggleTrackingMenu = () => {
		dispatch(setTrackingMenuVisible(!visibleTrackingMenu));
	};

	return (
		<View style={Styles.navigatorTab}>
			<NavigatorButton
				iconName="map"
				path="/"
				text={languages["Map"][language]}
			/>
			<MenuButton
				iconName="route"
				onPress={toggleMyRoutesMenu}
				routeActive={routeActive}
				text={languages["My routes"][language]}
				visible={visibleMyRoutesMenu}
			/>
			<MenuButton
				iconName="location-arrow"
				onPress={toggleTrackingMenu}
				text={languages["Tracking"][language]}
				visible={visibleTrackingMenu}
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
