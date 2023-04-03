import { Text } from "react-native";

import ModalSelector from "react-native-modal-selector";
import { languages } from "../../languages";
import { Map } from "../../types";
import { useTypedDispatch, useTypedSelector } from "../../store";
import Styles from "../../styles";
import { changeMap } from "../../reducers/map-reducer";

const MapSelect = (): JSX.Element => {
	const [language, currMap] = useTypedSelector((state) => [state.language, state.map]);
	const dispatch = useTypedDispatch();
	const mapOptions = [
		{
			component: <Text>{languages["National Land Survey of Finland"][language]}</Text>,
			key: 1,
			label: Map.nlsTopographic,
		},
		{
			component: <Text>OpenStreetMap</Text>,
			key: 2,
			label: Map.openStreetMap,
		},
		{
			component: <Text>{languages["Plain map"][language]}</Text>,
			key: 3,
			label: Map.nlsPlain,
		},
		{
			component: <Text>{languages["Aerial image"][language]}</Text>,
			key: 4,
			label: Map.nlsAerial,
		},
	];
	return (
		<>
			<Text>{languages["Change map type"][language]}</Text>
			<ModalSelector
				cancelText={languages["Cancel"][language].toLowerCase()}
				data={mapOptions}
				initValue={currMap}
				initValueTextStyle={Styles.initValueTextStyle}
				onChange={async (option: { label: Map }) => {
					await dispatch(changeMap(option.label));
				}}
			/>
		</>
	);
};
export default MapSelect;
