import { View } from "react-native";
import { connect } from "react-redux";
import { languages } from "../languages";
import {
	setMapMenuVisible,
	setMyRoutesMenuVisible,
	setTrackingMenuVisible,
	setSettingsMenuVisible,
} from "../reducers/ui-reducer";
import { useTypedDispatch, useTypedSelector } from "../store";
import Styles from "../styles";
import MenuButton from "./MenuButton";

/**
 * Navigator tab located at the bottom of the screen which contains
 * navigator buttons to navigate into other views.
 *
 * @returns {JSX.Element} A new NavigatorTab component.
 */
const NavigatorTab = (): JSX.Element => {
	const language = useTypedSelector((state) => state.language);
	const visibleMapMenu = useTypedSelector((state) => state.ui.mapMenuVisible);
	const visibleMyRoutesMenu = useTypedSelector((state) => state.ui.myRoutesMenuVisible);
	const visibleTrackingMenu = useTypedSelector((state) => state.ui.trackingMenuVisible);
	const visibleSettingsMenu = useTypedSelector((state) => state.ui.settingsMenuVisible);
	const routeActive = useTypedSelector((state) => state.route.active);
	const dispatch = useTypedDispatch();

	const toggleMapMenu = () => {
		dispatch(setMapMenuVisible(!visibleMapMenu));
	};

	const toggleMyRoutesMenu = () => {
		dispatch(setMyRoutesMenuVisible(!visibleMyRoutesMenu));
	};

	const toggleTrackingMenu = () => {
		dispatch(setTrackingMenuVisible(!visibleTrackingMenu));
	};

	const toggleSettingsMenu = () => {
		dispatch(setSettingsMenuVisible(!visibleSettingsMenu));
	};

	return (
		<View style={Styles.navigatorTab}>
			<MenuButton
				iconName="map"
				onPress={toggleMapMenu}
				text={languages["Map"][language]}
				visible={visibleMapMenu}
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
			<MenuButton
				iconName="cog"
				onPress={toggleSettingsMenu}
				text={languages["Settings"][language]}
				visible={visibleSettingsMenu}
			/>
		</View>
	);
};

const ConnectedNavigatorTab = connect()(NavigatorTab);
export default ConnectedNavigatorTab;
