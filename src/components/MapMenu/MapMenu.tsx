import { View } from "react-native";
import { languages } from "../../languages";
import { changeMap } from "../../reducers/map-reducer";
import { useTypedDispatch, useTypedSelector } from "../../store";
import Styles from "../../styles";
import { Map } from "../../types";
import Title from "../Title";
import MapSelectionButton from "./MapSelectionButton";

/**
 * A menu for choosing a map.
 *
 * @returns {JSX.Element} A new MapMenu component.
 */
const MapMenu = (): JSX.Element => {
	const language = useTypedSelector((state) => state.language);
	const toggled = useTypedSelector((state) => state.ui.mapMenuVisible);
	const currentMap = useTypedSelector((state) => state.map);
	const dispatch = useTypedDispatch();
	const source = "../../../assets/maps";

	return (
		<View style={toggled ? Styles.mapMenuContainer : { ...Styles.mapMenuContainer, display: "none" }}>
			<View style={Styles.mapSelectionButtonContainer}>
				<Title text={languages["Map"][language]} />
				<View style={Styles.mapSelectionButtonRow}>
					<MapSelectionButton
						imageFile={require(`${source}/topo.png`)}
						onPress={() => dispatch(changeMap(Map.nlsTopographic))}
						selected={currentMap === Map.nlsTopographic}
						text={languages["Topographic"][language]}
					/>
					<MapSelectionButton
						imageFile={require(`${source}/osm.png`)}
						onPress={() => dispatch(changeMap(Map.openStreetMap))}
						selected={currentMap === Map.openStreetMap}
						text={"OSM"}
					/>
				</View>
				<View style={Styles.mapSelectionButtonRow}>
					<MapSelectionButton
						imageFile={require(`${source}/plain.png`)}
						onPress={() => dispatch(changeMap(Map.nlsPlain))}
						selected={currentMap === Map.nlsPlain}
						text={languages["Plain"][language]}
					/>
					<MapSelectionButton
						imageFile={require(`${source}/satellite.png`)}
						onPress={() => dispatch(changeMap(Map.nlsAerial))}
						selected={currentMap === Map.nlsAerial}
						text={languages["Satellite"][language]}
					/>
				</View>
			</View>
		</View>
	);
};

export default MapMenu;
