import { View } from "react-native";
import { languages } from "../../languages";
import { useTypedDispatch, useTypedSelector } from "../../store";
import Styles from "../../styles";
import MapSelectionButton from "./MapSelectionButton";
import { Map } from "../../types";
import { changeMap } from "../../reducers/map-reducer";

/**
 * Route button container component which contains buttons to
 * start / end route tracking and to toggle route visibility on / off.
 * Just preliminary styling and location on a screen.
 *
 * @returns {JSX.Element} A new MyRoutesMenu component.
 */
const MapMenu = (): JSX.Element => {
	const language = useTypedSelector((state) => state.language);
	const toggled = useTypedSelector((state) => state.ui.mapMenuVisible);
	const dispatch = useTypedDispatch();

	return (
		<View style={toggled ? Styles.routeButtonContainer : { ...Styles.routeButtonContainer, display: "none" }}>
			<MapSelectionButton
				onPress={() => dispatch(changeMap(Map.nlsTopographic))}
				text={languages["Topographic"][language]}
			/>
			<MapSelectionButton
				onPress={() => dispatch(changeMap(Map.openStreetMap))}
				text={"Open Street Map"}
			/>
			<MapSelectionButton
				onPress={() => dispatch(changeMap(Map.nlsPlain))}
				text={languages["Plain map"][language]}
			/>
			<MapSelectionButton
				onPress={() => dispatch(changeMap(Map.nlsAerial))}
				text={languages["Aerial image"][language]}
			/>
		</View>
	);
};

export default MapMenu;
