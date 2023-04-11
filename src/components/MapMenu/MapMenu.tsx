import { View } from "react-native";
import { languages } from "../../languages";
import { changeShowRoute } from "../../reducers/route-reducer";
import { useTypedDispatch, useTypedSelector } from "../../store";
import Styles from "../../styles";
import MapSelectionButton from "./MapSelectionButton";

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
				onPress={() => dispatch(changeShowRoute())}
				text={languages["National Land Survey of Finland"][language]}
			/>
			<MapSelectionButton
				onPress={() => dispatch(changeShowRoute())}
				text={"Open Street Map"}
			/>
			<MapSelectionButton
				onPress={() => dispatch(changeShowRoute())}
				text={languages["Plain map"][language]}
			/>
			<MapSelectionButton
				onPress={() => dispatch(changeShowRoute())}
				text={languages["Aerial image"][language]}
			/>
		</View>
	);
};

export default MapMenu;
