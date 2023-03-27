import { View } from "react-native";
import { connect } from "react-redux";
import { languages } from "../languages";
import { setRouteButtonVisible, setTrackListVisible } from "../reducers/ui-reducer";
import { useTypedDispatch, useTypedSelector } from "../store";
import Styles from "../styles";
import NavigatorButton from "./NavigatorButton";
import ToggleButton from "./ToggleButton";
import TrackingButton from "./TrackingButton";

/**
 * Navigator tab located at the bottom of the screen which contains
 * navigator buttons to navigate into other views.
 *
 * @returns {JSX.Element} A new NavigatorTab component.
 */
const NavigatorTab = (): JSX.Element => {
	const language = useTypedSelector((state) => state.language);
	const ui = useTypedSelector((state) => state.ui);
	const dispatch = useTypedDispatch();

	const toggleRouteButtons = () => {
		dispatch(setRouteButtonVisible(!ui.routeButtonsVisible));
	};

	const toggleList = () => {
		dispatch(setTrackListVisible(!ui.trackListVisible));
	};

	return (
		<View style={Styles.navigatorTab}>
			<ToggleButton
				iconName="route"
				onPress={toggleRouteButtons}
				text={languages["Routes"][language]}
			/>
			<NavigatorButton
				iconName="map"
				path="/"
				text={languages["Map"][language]}
			/>
			<TrackingButton
				iconName="location-arrow"
				onPress={toggleList}
				text={languages["Tracking"][language]}
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
